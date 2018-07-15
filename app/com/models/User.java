package com.models;

import com.fasterxml.jackson.annotation.JsonIgnore;


import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the user database table.
 * 
 */
@Entity
@NamedQuery(name="User.findAll", query="SELECT u FROM User u")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private UserPK id;

	@Column(name="user_email")
	private String userEmail;

	@Column(name="user_name")
	private String userName;

	@Column(name="user_password")
	private String userPassword;

	@Column(name="user_status_on")
	private int userStatusOn;

	//bi-directional many-to-one association to Club
	@ManyToOne
	@JoinColumn(name="club_id")
	private Club club;

	//bi-directional many-to-one association to UserFootmatch
	@JsonIgnore
	@OneToMany(mappedBy="user")
	private List<UserFootmatch> userFootmatches;

	//bi-directional many-to-one association to UserTournement
	@JsonIgnore
	@OneToMany(mappedBy="user")
	private List<UserTournement> userTournements;

	public User() {
	}

	public int getuserStatusOn() {
					return userStatusOn;
	}

	public void setuserStatusOn(int userStatusOn) {
					this.userStatusOn = userStatusOn;
	}

	public UserPK getId() {
		return this.id;
	}

	public void setId(UserPK id) {
		this.id = id;
	}

	public String getUserEmail() {
		return this.userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserPassword() {
		return this.userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public Club getClub() {
		return this.club;
	}

	public void setClub(Club club) {
		this.club = club;
	}

	public List<UserFootmatch> getUserFootmatches() {
		return this.userFootmatches;
	}

	public void setUserFootmatches(List<UserFootmatch> userFootmatches) {
		this.userFootmatches = userFootmatches;
	}

	
	public UserFootmatch addUserFootmatch(UserFootmatch userFootmatch) {
		getUserFootmatches().add(userFootmatch);
		userFootmatch.setUser(this);

		return userFootmatch;
	}

	public UserFootmatch removeUserFootmatch(UserFootmatch userFootmatch) {
		getUserFootmatches().remove(userFootmatch);
		userFootmatch.setUser(null);

		return userFootmatch;
	}

	public List<UserTournement> getUserTournements() {
		return this.userTournements;
	}

	public void setUserTournements(List<UserTournement> userTournements) {
		this.userTournements = userTournements;
	}

	public UserTournement addUserTournement(UserTournement userTournement) {
		getUserTournements().add(userTournement);
		userTournement.setUser(this);

		return userTournement;
	}

	public UserTournement removeUserTournement(UserTournement userTournement) {
		getUserTournements().remove(userTournement);
		userTournement.setUser(null);

		return userTournement;
	}

}