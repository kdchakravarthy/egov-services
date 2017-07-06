package org.egov.report.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.egov.common.contract.request.RequestInfo;
import org.egov.swagger.model.ColumnDetail;
import org.egov.swagger.model.ColumnDetail.TypeEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.egov.swagger.model.MetadataResponse;
import org.egov.swagger.model.ReportDefinition;
import org.egov.swagger.model.SearchColumn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.jayway.jsonpath.Configuration;
import com.jayway.jsonpath.JsonPath;

@Service
public class IntegrationService {
	
	@Autowired
	private RestTemplate restTemplate;
	
	public static final Logger LOGGER = LoggerFactory.getLogger(IntegrationService.class);
	
	public MetadataResponse getData(ReportDefinition reportDefinition, MetadataResponse metadataResponse, RequestInfo requestInfo){
		
		
		List<SearchColumn>  searchColumns = reportDefinition.getSearchParams();
		List<ColumnDetail> columnDetails = metadataResponse.getReportDetails().getSearchParams();
		Map<String, ColumnDetail> colNameMap = columnDetails.stream().collect(Collectors.toMap(ColumnDetail::getName, Function.identity()));
		
		LOGGER.info("colNameMap:"+colNameMap);
		for(SearchColumn searchColumn : searchColumns){
			LOGGER.info("searchColumn:"+searchColumn);
			if(searchColumn.getType().equals(TypeEnum.SINGLEVALUELIST)){
				LOGGER.info("if searchColumn:"+searchColumn);
				String[] patterns= searchColumn.getPattern().split("\\|");
				LOGGER.info("patterns:"+patterns.toString());
				String url = patterns[0];
				url = url.replaceAll("\\$tenantid",metadataResponse.getTenantId());
				LOGGER.info("url:"+url);
				String res = restTemplate.postForObject(url,requestInfo, String.class);
				LOGGER.info("res:"+res);
				Object document = Configuration.defaultConfiguration().jsonProvider().parse(res);
				LOGGER.info("document:"+document);
				List<Object> keys = JsonPath.read(document, patterns[1]);
				LOGGER.info("keys:"+keys);
				List<Object> values = JsonPath.read(document, patterns[2]);
				LOGGER.info("values:"+values);
				Map<Object, Object> map = new HashMap<>();
				for(int i=0;i<keys.size();i++){
					map.put(keys.get(i), values.get(i));
				}
				LOGGER.info("value map-->"+map);
				ColumnDetail columnDetail = colNameMap.get(searchColumn.getName());
				columnDetail.setDefaultValue(map);
			}
			
		}
		
		return metadataResponse;
	}

}
