package com.models;

/**
	* @author DORGAA FAHED
	* Date: 17/07/2018
	* Time: 16:41
	*/
public class JwtClaim {
				private Long userId;
				private String userRole;

				public Long getUserId() {
								return userId;
				}

				public void setUserId(Long userId) {
								this.userId = userId;
				}

				public String getUserRole() {
								return userRole;
				}

				public void setUserRole(String userRole) {
								this.userRole = userRole;
				}
}
