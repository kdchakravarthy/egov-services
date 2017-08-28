package org.egov.user.domain.exception;

import org.egov.user.domain.model.User;

import lombok.Getter;

@Getter
public class AtleastOneRoleCodeException extends RuntimeException {

	private static final long serialVersionUID = 1554672029887030683L;

	@Getter
	private User user;

	public AtleastOneRoleCodeException(User user) {
		this.user = user;
	}

}