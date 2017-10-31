package org.egov.pa.repository;

import java.util.List;

import org.egov.pa.model.KPI;
import org.egov.pa.model.KpiTarget;
import org.egov.pa.model.KpiValue;
import org.egov.pa.model.KpiValueList;
import org.egov.pa.web.contract.KPIValueRequest;
import org.egov.pa.web.contract.KPIValueSearchRequest;

public interface KpiValueRepository {
	
	public void persistKpiValue(final KPIValueRequest kpiValueRequest);
    
    public void updateKpiValue(final KPIValueRequest kpiValueRequest);
    
    public List<KpiValueList> searchKpiValue(KPIValueSearchRequest kpiValueSearchReq);

    public List<KPI> checkKpiExists(String kpiCode); 
    
    public List<KpiTarget> fetchTargetForKpi(String kpiCode, String finYear); 
    
    public KpiValue checkKpiValueExistsForTenant(String kpiCode, String tenantId); 
    
    public String searchPossibilityCheck(String tenantCount, String kpiCount, String finYearCount);
}
