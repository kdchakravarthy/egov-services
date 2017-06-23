package org.egov.calculator.controller;

import static org.junit.Assert.assertTrue;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

import org.egov.calculator.PtCalculatorApplication;
import org.egov.calculator.api.TaxCalculatorController;
import org.egov.calculator.service.TaxCalculatorService;
import org.egov.models.AuditDetails;
import org.egov.models.CalculationFactor;
import org.egov.models.CalculationFactorRequest;
import org.egov.models.CalculationFactorResponse;
import org.egov.models.GuidanceValue;
import org.egov.models.GuidanceValueRequest;
import org.egov.models.GuidanceValueResponse;
import org.egov.models.RequestInfo;
import org.egov.models.ResponseInfo;
import org.egov.models.TaxPeriod;
import org.egov.models.TaxPeriodRequest;
import org.egov.models.TaxPeriodResponse;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@WebMvcTest(TaxCalculatorController.class)
@ContextConfiguration(classes = { PtCalculatorApplication.class })
public class TaxCalculatorControllerTest {

	@MockBean
	private TaxCalculatorService taxCalculatorService;

	@Autowired
	private MockMvc mockMvc;

	@Test
	public void testShouldCreateFactor() {

		List<CalculationFactor> calculationFactors = new ArrayList<>();
		CalculationFactor calculationFactor = new CalculationFactor();
		calculationFactor.setTenantId("default");

		AuditDetails auditDetails = new AuditDetails();
		calculationFactor.setAuditDetails(auditDetails);

		CalculationFactorResponse calculationFactorResponse = new CalculationFactorResponse();
		calculationFactors.add(calculationFactor);

		calculationFactorResponse.setResponseInfo(new ResponseInfo());
		calculationFactorResponse.setCalculationFactors(calculationFactors);

		try {
			when(taxCalculatorService.createFactor(any(String.class), any(CalculationFactorRequest.class)))
					.thenReturn(calculationFactorResponse);

			mockMvc.perform(post("/properties/taxes/factor/_create").param("tenantId", "default")
					.contentType(MediaType.APPLICATION_JSON).content(getFileContents("createFactorRequest.json")))
					.andExpect(status().isOk())
					.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
					.andExpect(content().json(getFileContents("createFactorResponse.json")));

		} catch (Exception e) {

			assertTrue(Boolean.FALSE);
		}

		assertTrue(Boolean.TRUE);
	}

	@Test
	public void testShouldUpdateFactor() {

		List<CalculationFactor> calculationFactors = new ArrayList<>();
		CalculationFactor calculationFactor = new CalculationFactor();
		calculationFactor.setId(1l);
		calculationFactor.setTenantId("default");
		calculationFactor.setFactorCode("propertytax");
		calculationFactor.setFactorType("occupancy");
		calculationFactor.setFactorValue(1234.12);
		calculationFactor.setFromDate("10/06/2007  00:00:00");
		calculationFactor.setToDate("25/06/2017  00:00:00");

		AuditDetails auditDetails = new AuditDetails();
		calculationFactor.setAuditDetails(auditDetails);

		CalculationFactorResponse calculationFactorResponse = new CalculationFactorResponse();
		calculationFactors.add(calculationFactor);

		calculationFactorResponse.setResponseInfo(new ResponseInfo());
		calculationFactorResponse.setCalculationFactors(calculationFactors);

		try {

			when(taxCalculatorService.updateFactor(any(String.class), any(CalculationFactorRequest.class)))
					.thenReturn(calculationFactorResponse);

			mockMvc.perform(post("/properties/taxes/factor/_update").param("tenantId", "default")
					.contentType(MediaType.APPLICATION_JSON).content(getFileContents("updateFactorRequest.json")))
					.andExpect(status().isOk())
					.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
					.andExpect(content().json(getFileContents("updateFactorResponse.json")));

		} catch (Exception e) {

			assertTrue(Boolean.FALSE);

		}

		assertTrue(Boolean.TRUE);
	}

	@Test
	public void testShouldSearchFactor() {

		List<CalculationFactor> calculationFactors = new ArrayList<>();
		CalculationFactor calculationFactor = new CalculationFactor();
		calculationFactor.setTenantId("default");
		calculationFactor.setFactorCode("propertytax");
		calculationFactor.setFactorType("occupancy");
		calculationFactor.setFactorValue(1234.12);
		calculationFactor.setFromDate("10/06/2007  00:00:00");
		calculationFactor.setToDate("25/06/2017  00:00:00");

		AuditDetails auditDetails = new AuditDetails();
		calculationFactor.setAuditDetails(auditDetails);

		CalculationFactorResponse calculationFactorResponse = new CalculationFactorResponse();
		calculationFactors.add(calculationFactor);

		calculationFactorResponse.setResponseInfo(new ResponseInfo());
		calculationFactorResponse.setCalculationFactors(calculationFactors);

		try {

			when(taxCalculatorService.getFactor(any(RequestInfo.class), any(String.class), any(String.class),
					any(String.class), any(String.class))).thenReturn(calculationFactorResponse);

			mockMvc.perform(post("/properties/taxes/factor/_search").param("tenantId", "default")
					.param("factorType", "building").param("validDate", "10/06/2007").param("code", "propertytax")
					.contentType(MediaType.APPLICATION_JSON).content(getFileContents("searchFactorRequest.json")))
					.andExpect(status().isOk())
					.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
					.andExpect(content().json(getFileContents("searchFactorResponse.json")));

		} catch (Exception e) {

			assertTrue(Boolean.FALSE);

		}
		assertTrue(Boolean.TRUE);

	}

	/**
	 * Description: Test case for create guidance value using rest controller
	 */
	@Test
	public void testShouldCreateGuidanceValue() {
		List<GuidanceValue> guidanceValues = new ArrayList<>();
		GuidanceValue guidanceValue = new GuidanceValue();
		guidanceValue.setTenantId("default");
		guidanceValue.setName("anil");
		guidanceValue.setBoundary("b1");

		AuditDetails auditDetails = new AuditDetails();
		guidanceValue.setAuditDetails(auditDetails);

		GuidanceValueResponse guidanceValueResponse = new GuidanceValueResponse();
		guidanceValues.add(guidanceValue);

		guidanceValueResponse.setResponseInfo(new ResponseInfo());
		guidanceValueResponse.setGuidanceValues(guidanceValues);

		try {
			when(taxCalculatorService.createGuidanceValue(any(String.class), any(GuidanceValueRequest.class)))
					.thenReturn(guidanceValueResponse);
			mockMvc.perform(post("/properties/taxes/guidancevalue/_create").param("tenantId", "default")
					.contentType(MediaType.APPLICATION_JSON)
					.content(getFileContents("createguidancevaluerequest.json"))).andExpect(status().isOk())
					.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
					.andExpect(content().json(getFileContents("createguidancevalueresponse.json")));

		} catch (Exception e) {

			assertTrue(Boolean.FALSE);
		}

		assertTrue(Boolean.TRUE);

	}

	/**
	 * Description: Test case for update guidance value using rest controller
	 */
	@Test
	public void testShouldUpdateGuidanceValue() {

		GuidanceValueResponse guidanceValueResponse = new GuidanceValueResponse();
		List<GuidanceValue> guidanceValues = new ArrayList<>();
		GuidanceValue guidanceValue = new GuidanceValue();
		guidanceValue.setTenantId("default");
		guidanceValue.setName("anil");
		guidanceValue.setBoundary("b2");

		AuditDetails auditDetails = new AuditDetails();
		guidanceValue.setAuditDetails(auditDetails);

		guidanceValues.add(guidanceValue);

		guidanceValueResponse.setResponseInfo(new ResponseInfo());
		guidanceValueResponse.setGuidanceValues(guidanceValues);

		try {
			when(taxCalculatorService.updateGuidanceValue(any(String.class), any(GuidanceValueRequest.class)))
					.thenReturn(guidanceValueResponse);

			mockMvc.perform(post("/properties/taxes/guidancevalue/_update").param("tenantId", "default")
					.contentType(MediaType.APPLICATION_JSON)
					.content(getFileContents("updateguidancevaluerequest.json"))).andExpect(status().isOk())
					.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
					.andExpect(content().json(getFileContents("updateguidancevlaueresponse.json")));

		} catch (Exception e) {
			assertTrue(Boolean.FALSE);
		}

		assertTrue(Boolean.TRUE);
	}

	/**
	 * Description: Test case for search guidance value using rest controller
	 */
	@Test
	public void testShouldSearchGuidanceValue() {

		GuidanceValueResponse guidanceValueResponse = new GuidanceValueResponse();
		List<GuidanceValue> guidanceValues = new ArrayList<>();
		GuidanceValue guidanceValue = new GuidanceValue();
		guidanceValue.setTenantId("default");
		guidanceValue.setName("anil");
		guidanceValue.setBoundary("b2");

		AuditDetails auditDetails = new AuditDetails();
		guidanceValue.setAuditDetails(auditDetails);

		guidanceValues.add(guidanceValue);

		guidanceValueResponse.setResponseInfo(new ResponseInfo());
		guidanceValueResponse.setGuidanceValues(guidanceValues);

		try {

			when(taxCalculatorService.getGuidanceValue(any(RequestInfo.class), any(String.class), any(String.class),
					any(String.class), any(String.class), any(String.class), any(String.class), any(String.class)))
							.thenReturn(guidanceValueResponse);

			mockMvc.perform(post("/properties/taxes/guidancevalue/_search").param("tenantId", "default")
					.contentType(MediaType.APPLICATION_JSON)
					.content(getFileContents("searchguidancevaluerequest.json"))).andExpect(status().isOk())
					.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
					.andExpect(content().json(getFileContents("searchguidancevlaueresponse.json")));

		} catch (Exception e) {
			assertTrue(Boolean.FALSE);
		}

		assertTrue(Boolean.TRUE);
	}

	/**
	 * This test will test whether the tax period is created successfully or not
	 */
	@Test
	public void testShouldCreateTaxPeriod() {

		List<TaxPeriod> taxPeriods = new ArrayList<>();
		TaxPeriod taxPeriod = new TaxPeriod();
		taxPeriod.setTenantId("1234");
		taxPeriod.setCode("MON");
		AuditDetails auditDetails = new AuditDetails();
		taxPeriod.setAuditDetails(auditDetails);

		taxPeriods.add(taxPeriod);
		TaxPeriodResponse taxPeriodResponse = new TaxPeriodResponse();
		taxPeriodResponse.setResponseInfo(new ResponseInfo());
		taxPeriodResponse.setTaxPeriods(taxPeriods);

		try {
			when(taxCalculatorService.createTaxPeriod(anyString(), any(TaxPeriodRequest.class)))
					.thenReturn(taxPeriodResponse);

			mockMvc.perform(post("/properties/taxes/taxperiods/_create").param("tenantId", "1234")
					.contentType(MediaType.APPLICATION_JSON).content(getFileContents("createTaxPeriodRequest.json")))
					.andExpect(status().isOk())
					.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
					.andExpect(content().json(getFileContents("createTaxPeriodResponse.json")));
		} catch (Exception e) {
			assertTrue(false);

		}

		assertTrue(true);

	}

	/**
	 * This will test whether the tax period object is updated successfully or
	 * not
	 */
	@Test
	public void testshouldUpdateTaxPeriod() {

		List<TaxPeriod> taxPeriods = new ArrayList<>();
		TaxPeriod taxPeriod = new TaxPeriod();
		taxPeriod.setTenantId("1234");
		taxPeriod.setCode("YEAR");
		AuditDetails auditDetails = new AuditDetails();
		taxPeriod.setAuditDetails(auditDetails);

		taxPeriods.add(taxPeriod);
		TaxPeriodResponse taxPeriodResponse = new TaxPeriodResponse();
		taxPeriodResponse.setResponseInfo(new ResponseInfo());
		taxPeriodResponse.setTaxPeriods(taxPeriods);

		try {
			when(taxCalculatorService.updateTaxPeriod(anyString(), any(TaxPeriodRequest.class)))
					.thenReturn(taxPeriodResponse);

			mockMvc.perform(post("/properties/taxes/taxperiods/_update").param("tenantId", "1234")
					.contentType(MediaType.APPLICATION_JSON).content(getFileContents("updateTaxPeriodRequest.json")))
					.andExpect(status().isOk())
					.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
					.andExpect(content().json(getFileContents("updateTaxPeriodResponse.json")));
		} catch (Exception e) {
			assertTrue(false);

		}

		assertTrue(true);
	}

	/**
	 * This will test whether the working of tax period's searching
	 */
	@Test
	public void testShouldSearchTaxPeriod() {

		List<TaxPeriod> taxPeriods = new ArrayList<>();
		TaxPeriod taxPeriod = new TaxPeriod();
		taxPeriod.setTenantId("1234");
		taxPeriod.setCode("ganesha");
		taxPeriod.setPeriodType("MONTH");
		taxPeriod.setFinancialYear("2017-18");
		taxPeriod.setFromDate("02/02/2017");
		taxPeriod.setToDate("02/02/2017");
		AuditDetails auditDetails = new AuditDetails();
		taxPeriod.setAuditDetails(auditDetails);

		taxPeriods.add(taxPeriod);
		TaxPeriodResponse taxPeriodResponse = new TaxPeriodResponse();
		taxPeriodResponse.setResponseInfo(new ResponseInfo());
		taxPeriodResponse.setTaxPeriods(taxPeriods);

		try {
			when(taxCalculatorService.getTaxPeriod(any(RequestInfo.class), anyString(), anyString(), anyString()))
					.thenReturn(taxPeriodResponse);

			mockMvc.perform(post("/properties/taxes/taxperiods/_search").param("tenantId", "1234")
					.param("validDate", "02/02/2017").param("code", "ganesha").contentType(MediaType.APPLICATION_JSON)
					.content(getFileContents("searchTaxPeriodRequest.json"))).andExpect(status().isOk())
					.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
					.andExpect(content().json(getFileContents("searchTaxPeriodResponse.json")));
		} catch (Exception e) {
			assertTrue(false);

		}
	}

	/**
	 *
	 * @param fileName
	 * @return {@link String} content of the given file
	 * @throws IOException
	 */
	private String getFileContents(String fileName) throws IOException {
		ClassLoader classLoader = getClass().getClassLoader();
		return new String(Files.readAllBytes(new File(classLoader.getResource(fileName).getFile()).toPath()));
	}

}