package org.egov.swm.persistence.repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egov.swm.domain.model.Boundary;
import org.egov.swm.domain.model.Contractor;
import org.egov.swm.domain.model.Pagination;
import org.egov.swm.domain.model.ServicedLocations;
import org.egov.swm.domain.model.ServicesOffered;
import org.egov.swm.domain.model.SwmProcess;
import org.egov.swm.domain.model.Vendor;
import org.egov.swm.domain.model.VendorSearch;
import org.egov.swm.persistence.entity.VendorEntity;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class VendorJdbcRepository {

	@Autowired
	public JdbcTemplate jdbcTemplate;

	@Autowired
	public NamedParameterJdbcTemplate namedParameterJdbcTemplate;

	@Autowired
	public ContractorJdbcRepository contractorJdbcRepository;

	@Autowired
	public ServicedLocationsJdbcRepository servicedLocationsJdbcRepository;

	@Autowired
	public ServicesOfferedJdbcRepository servicesOfferedJdbcRepository;

	public Pagination<Vendor> search(VendorSearch searchRequest) {

		String searchQuery = "select * from egswm_vendor :condition  :orderby ";

		Map<String, Object> paramValues = new HashMap<>();
		StringBuffer params = new StringBuffer();

		if (searchRequest.getSortBy() != null && !searchRequest.getSortBy().isEmpty()) {
			validateSortByOrder(searchRequest.getSortBy());
			validateEntityFieldName(searchRequest.getSortBy(), VendorSearch.class);
		}

		String orderBy = "order by name";
		if (searchRequest.getSortBy() != null && !searchRequest.getSortBy().isEmpty()) {
			orderBy = "order by " + searchRequest.getSortBy();
		}

		if (searchRequest.getVendorNo() != null) {
			if (params.length() > 0) {
				params.append(" and ");
			}
			params.append("vendorNo in (:vendorNo)");
			paramValues.put("vendorNo", searchRequest.getVendorNo());
		}

		if (searchRequest.getVendorNos() != null) {
			if (params.length() > 0) {
				params.append(" and ");
			}
			params.append("vendorNo in (:vendorNos)");
			paramValues.put("vendorNos", new ArrayList<String>(Arrays.asList(searchRequest.getVendorNos().split(","))));
		}
		if (searchRequest.getTenantId() != null) {
			if (params.length() > 0) {
				params.append(" and ");
			}
			params.append("tenantId =:tenantId");
			paramValues.put("tenantId", searchRequest.getTenantId());
		}

		if (searchRequest.getName() != null) {
			if (params.length() > 0) {
				params.append(" and ");
			}
			params.append("name =:name");
			paramValues.put("name", searchRequest.getName());
		}

		if (searchRequest.getRegistrationNo() != null) {
			if (params.length() > 0) {
				params.append(" and ");
			}
			params.append("registrationNo =:registrationNo");
			paramValues.put("registrationNo", searchRequest.getRegistrationNo());
		}

		if (searchRequest.getContractorNo() != null) {
			if (params.length() > 0) {
				params.append(" and ");
			}
			params.append("contractor =:contractor");
			paramValues.put("contractor", searchRequest.getContractorNo());
		}

		Pagination<Vendor> page = new Pagination<>();
		if (searchRequest.getOffset() != null) {
			page.setOffset(searchRequest.getOffset());
		}
		if (searchRequest.getPageSize() != null) {
			page.setPageSize(searchRequest.getPageSize());
		}

		if (params.length() > 0) {

			searchQuery = searchQuery.replace(":condition", " where " + params.toString());

		} else

			searchQuery = searchQuery.replace(":condition", "");

		searchQuery = searchQuery.replace(":orderby", orderBy);

		page = (Pagination<Vendor>) getPagination(searchQuery, page, paramValues);
		searchQuery = searchQuery + " :pagination";

		searchQuery = searchQuery.replace(":pagination",
				"limit " + page.getPageSize() + " offset " + page.getOffset() * page.getPageSize());

		BeanPropertyRowMapper row = new BeanPropertyRowMapper(VendorEntity.class);

		List<Vendor> vendorList = new ArrayList<>();

		List<VendorEntity> vendorEntities = namedParameterJdbcTemplate.query(searchQuery.toString(), paramValues, row);
		Vendor v;
		Contractor cs;
		ServicedLocations servicedLocations;
		ServicesOffered servicesOffered;
		List<Contractor> contractors;
		List<ServicedLocations> sls;
		List<ServicesOffered> sos;
		for (VendorEntity vendorEntity : vendorEntities) {

			v = vendorEntity.toDomain();
			cs = Contractor.builder().tenantId(v.getTenantId()).contractorNo(vendorEntity.getContractor()).build();

			contractors = contractorJdbcRepository.search(cs);

			if (contractors != null && !contractors.isEmpty()) {
				v.setContractor(contractors.get(0));
			}

			servicedLocations = ServicedLocations.builder().tenantId(v.getTenantId()).vendor(v.getVendorNo()).build();

			sls = servicedLocationsJdbcRepository.search(servicedLocations);

			if (sls != null && !sls.isEmpty()) {

				v.setServicedLocations(new ArrayList<>());

				for (ServicedLocations sl : sls) {
					v.getServicedLocations().add(Boundary.builder().code(sl.getLocation()).build());
				}
			}

			servicesOffered = ServicesOffered.builder().tenantId(v.getTenantId()).vendor(v.getVendorNo()).build();

			sos = servicesOfferedJdbcRepository.search(servicesOffered);

			if (sos != null && !sos.isEmpty()) {

				v.setServicesOffered(new ArrayList<>());

				for (ServicesOffered so : sos) {
					v.getServicesOffered().add(SwmProcess.builder().name(so.getService()).build());
				}
			}

			vendorList.add(v);

		}

		page.setTotalResults(vendorList.size());

		page.setPagedData(vendorList);

		return page;
	}

	public Pagination<?> getPagination(String searchQuery, Pagination<?> page, Map<String, Object> paramValues) {
		String countQuery = "select count(*) from (" + searchQuery + ") as x";
		Long count = namedParameterJdbcTemplate.queryForObject(countQuery.toString(), paramValues, Long.class);
		Integer totalpages = (int) Math.ceil((double) count / page.getPageSize());
		page.setTotalPages(totalpages);
		page.setCurrentPage(page.getOffset());
		return page;
	}

	public void validateSortByOrder(final String sortBy) {
		List<String> sortByList = new ArrayList<String>();
		if (sortBy.contains(",")) {
			sortByList = Arrays.asList(sortBy.split(","));
		} else {
			sortByList = Arrays.asList(sortBy);
		}
		for (String s : sortByList) {
			if (s.contains(" ")
					&& (!s.toLowerCase().trim().endsWith("asc") && !s.toLowerCase().trim().endsWith("desc"))) {

				throw new CustomException(s.split(" ")[0],
						"Please send the proper sortBy order for the field " + s.split(" ")[0]);
			}
		}

	}

	public void validateEntityFieldName(String sortBy, final Class<?> object) {
		List<String> sortByList = new ArrayList<String>();
		if (sortBy.contains(",")) {
			sortByList = Arrays.asList(sortBy.split(","));
		} else {
			sortByList = Arrays.asList(sortBy);
		}
		Boolean isFieldExist = Boolean.FALSE;
		for (String s : sortByList) {
			for (int i = 0; i < object.getDeclaredFields().length; i++) {
				if (object.getDeclaredFields()[i].getName().equals(s.contains(" ") ? s.split(" ")[0] : s)) {
					isFieldExist = Boolean.TRUE;
					break;
				} else {
					isFieldExist = Boolean.FALSE;
				}
			}
			if (!isFieldExist) {
				throw new CustomException(s.contains(" ") ? s.split(" ")[0] : s, "Please send the proper Field Names ");

			}
		}

	}

}