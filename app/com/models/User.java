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

	@Id
	@Column(name="user_id")
	private int userId;

	@Column(name="user_email")
	private String userEmail;

	@Column(name="user_name")
	private String userName;

	@Column(name="user_password")
	private String userPassword;

	//bi-directional many-to-many association to Footmatch
	@JsonIgnore
	@ManyToMany
	@JoinTable(
		name="user_footmatch"
		, joinColumns={
			@JoinColumn(name="user_id" , referencedColumnName = "user_id")
			}
		, inverseJoinColumns={
			@JoinColumn(name="match_id", referencedColumnName="match_id")
			}
		)
	private List<Footmatch> footmatches;

	//bi-directional many-to-many association to Tournement
    @JsonIgnore
	@ManyToMany
	@JoinTable(
		name="user_tournement"
		, joinColumns={
			@JoinColumn(name="user_id" , referencedColumnName ="user_id" )
			}
		, inverseJoinColumns={
			@JoinColumn(name="tournement_id" , referencedColumnName="tournement_id")
			}
		)
	private List<Tournement> tournements;

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

	public int getUserId() {
		return this.userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
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

	public List<Footmatch> getFootmatches() {
		return this.footmatches;
	}

	public void setFootmatches(List<Footmatch> footmatches) {
		this.footmatches = footmatches;
	}

	public List<Tournement> getTournements() {
		return this.tournements;
	}

	public void setTournements(List<Tournement> tournements) {
		this.tournements = tournements;
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