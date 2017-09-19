package org.egov.egf.bill.web.repository;

import org.egov.egf.bill.web.contract.BillRegisterContract;
import org.egov.egf.bill.web.requests.BillRegisterResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class BillRegisterContractRepository {
    private RestTemplate restTemplate;
    private String hostUrl;
    public static final String SEARCH_URL = " /egf-bill/billregisters/search?";
    @Autowired
    private ObjectMapper objectMapper;

    public BillRegisterContractRepository(@Value("${egf.bill.host.url}") String hostUrl, RestTemplate restTemplate) {
	this.restTemplate = restTemplate;
	this.hostUrl = hostUrl;
    }

    public BillRegisterContract findById(BillRegisterContract billRegisterContract) {
	String url = String.format("%s%s", hostUrl, SEARCH_URL);
	StringBuffer content = new StringBuffer();
	if (billRegisterContract.getId() != null) {
	    content.append("id=" + billRegisterContract.getId());
	}
	if (billRegisterContract.getTenantId() != null) {
	    content.append("&tenantId=" + billRegisterContract.getTenantId());
	}
	url = url + content.toString();
	BillRegisterResponse result = restTemplate.postForObject(url, null, BillRegisterResponse.class);
	if (result.getBillRegisters() != null && result.getBillRegisters().size() == 1) {
	    return result.getBillRegisters().get(0);
	} else {
	    return null;
	}
    }
}