package org.egov.pgrrest.read.persistence.repository;

import org.egov.pgrrest.common.contract.SevaRequest;
import org.egov.pgrrest.read.domain.model.ServiceRequest;
import org.egov.pgrrest.read.domain.model.ServiceRequestSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class ServiceRequestRepository {
    private static final String POST = "POST";
    private static final String PUT = "PUT";
    private ServiceRequestMessageQueueRepository serviceRequestMessageQueueRepository;
    private SubmissionRepository submissionRepository;

    @Autowired
    public ServiceRequestRepository(ServiceRequestMessageQueueRepository serviceRequestMessageQueueRepository,
                                    SubmissionRepository submissionRepository) {
        this.serviceRequestMessageQueueRepository = serviceRequestMessageQueueRepository;
        this.submissionRepository = submissionRepository;
    }

    public void save(SevaRequest sevaRequest) {
        Date date = Calendar.getInstance().getTime();
        sevaRequest.getRequestInfo().setAction(POST);
        sevaRequest.getServiceRequest().setCreatedDate(date);
        this.serviceRequestMessageQueueRepository.save(sevaRequest);
    }

    public List<ServiceRequest> findAll(ServiceRequestSearchCriteria serviceRequestSearchCriteria) {
        return findInSubmissionTable(serviceRequestSearchCriteria);
    }

    private List<ServiceRequest> findInSubmissionTable(ServiceRequestSearchCriteria serviceRequestSearchCriteria) {
        return submissionRepository.find(serviceRequestSearchCriteria);
    }

    public void update(SevaRequest sevaRequest) {
        Date date = Calendar.getInstance().getTime();
        sevaRequest.getRequestInfo().setAction(PUT);
        sevaRequest.getServiceRequest().setLastModifiedDate(date);
        this.serviceRequestMessageQueueRepository.save(sevaRequest);
    }

}
