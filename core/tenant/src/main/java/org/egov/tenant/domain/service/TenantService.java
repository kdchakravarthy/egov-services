package org.egov.tenant.domain.service;

import org.egov.tenant.domain.model.Tenant;
import org.egov.tenant.domain.model.TenantSearchCriteria;
import org.egov.tenant.persistence.repository.TenantRepository;
import org.egov.tenant.web.contract.TenantResponse;
import org.egov.tenant.web.contract.TenantSearchRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TenantService {

    private TenantRepository tenantRepository;

    public TenantService(TenantRepository tenantRepository) {
        this.tenantRepository = tenantRepository;
    }

    public List<Tenant> searchTenantsForCodes(final TenantSearchCriteria tenantSearchCriteria) {
       return tenantRepository.findForCriteria(tenantSearchCriteria);
    }

    public Tenant createTenant(Tenant tenant) {
        return tenantRepository.saveTenant(tenant);
    }
}
