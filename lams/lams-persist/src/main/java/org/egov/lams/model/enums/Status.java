package org.egov.lams.model.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Status {

	ACTIVE("ACTIVE"), CANCELLED("CANCELLED"), EVICTED("EVICTED");

	private String value;

	Status(String value) {
		this.value = value;
	}

	@Override
	@JsonValue
	public String toString() {
		return String.valueOf(value);
	}

	@JsonCreator
	public static Status fromValue(String text) {
		for (Status b : Status.values()) {
			if (String.valueOf(b.value).equals(text)) {
				return b;
			}
		}
		return null;
	}
}
