package org.egov.citizen.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServiceReq {

	private String tenantId;	
	private String serviceRequestId;
	private String serviceCode;
	private Integer lat;
	private Integer lang;	
	private String address;	 
	private String addressId;	
	private String email;
	private String deviceId;	
	private String accountId;
	private String firstName;
	private String lastName;
	private String phone;
	private String description;
    private List<Value>	attributeValues;
	private String status;	
	private String assignedTo;
	private String[] comments;	
	private Object backendServiceDetails;
	private AuditDetails auditDetails;
	
}
