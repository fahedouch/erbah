package com.models;

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

	@Column(name="user_point")
	private String userPoint;

	//bi-directional many-to-many association to Match
	@ManyToMany
	@JoinTable(
		name="user_match"
		, joinColumns={
			@JoinColumn(referencedColumnName="user_id")
			}
		, inverseJoinColumns={
			@JoinColumn(referencedColumnName="match_id")
			}
		)
	private List<Match> matches;

	//bi-directional many-to-many association to Ranking
	@ManyToMany
	@JoinTable(
		name="user_ranking"
		, joinColumns={
			@JoinColumn(referencedColumnName="user_id")
			}
		, inverseJoinColumns={
			@JoinColumn(referencedColumnName="ranking_id")
			}
		)
	private List<Ranking> rankings;

	//bi-directional many-to-many association to Tournement
	@ManyToMany
	@JoinTable(
		name="user_tournement"
		, joinColumns={
			@JoinColumn(referencedColumnName="user_id")
			}
		, inverseJoinColumns={
			@JoinColumn(referencedColumnName="tournement_id")
			}
		)
	private List<Tournement> tournements;

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

	public String getUserPoint() {
		return this.userPoint;
	}

	public void setUserPoint(String userPoint) {
		this.userPoint = userPoint;
	}

	public List<Match> getMatches() {
		return this.matches;
	}

	public void setMatches(List<Match> matches) {
		this.matches = matches;
	}

	public List<Ranking> getRankings() {
		return this.rankings;
	}

	public void setRankings(List<Ranking> rankings) {
		this.rankings = rankings;
	}

	public List<Tournement> getTournements() {
		return this.tournements;
	}

	public void setTournements(List<Tournement> tournements) {
		this.tournements = tournements;
	}

}