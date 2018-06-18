package com.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the user_tournement database table.
 * 
 */
@Entity
@Table(name="user_tournement")
@NamedQuery(name="UserTournement.findAll", query="SELECT u FROM UserTournement u")
public class UserTournement implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private UserTournementPK id;

	@Column(name="user_accepted_goal")
	private int userAcceptedGoal;

	@Column(name="user_defeat")
	private int userDefeat;

	@Column(name="user_difference")
	private int userDifference;

	@Column(name="user_goal_by_match")
	private float userGoalByMatch;

	@Column(name="user_goal_scored")
	private int userGoalScored;

	@Column(name="user_name")
	private String userName;

	@Column(name="user_null")
	private int userNull;

	@Column(name="user_point")
	private int userPoint;

	@Column(name="user_victory")
	private int userVictory;

	//bi-directional many-to-one association to Tournement
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="tournement_id")
	private Tournement tournement;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumns({
									@JoinColumn(name="user_id", referencedColumnName="user_id"),
									@JoinColumn(name="user_pseudo", referencedColumnName="user_pseudo")
	})
	private User user;

	public UserTournement() {
	}

	public UserTournementPK getId() {
		return this.id;
	}

	public void setId(UserTournementPK id) {
		this.id = id;
	}

	public int getUserAcceptedGoal() {
		return this.userAcceptedGoal;
	}

	public void setUserAcceptedGoal(int userAcceptedGoal) {
		this.userAcceptedGoal = userAcceptedGoal;
	}

	public int getUserDefeat() {
		return this.userDefeat;
	}

	public void setUserDefeat(int userDefeat) {
		this.userDefeat = userDefeat;
	}

	public int getUserDifference() {
		return this.userDifference;
	}

	public void setUserDifference(int userDifference) {
		this.userDifference = userDifference;
	}

	public float getUserGoalByMatch() {
		return this.userGoalByMatch;
	}

	public void setUserGoalByMatch(float userGoalByMatch) {
		this.userGoalByMatch = userGoalByMatch;
	}

	public int getUserGoalScored() {
		return this.userGoalScored;
	}

	public void setUserGoalScored(int userGoalScored) {
		this.userGoalScored = userGoalScored;
	}

	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public int getUserNull() {
		return this.userNull;
	}

	public void setUserNull(int userNull) {
		this.userNull = userNull;
	}

	public int getUserPoint() {
		return this.userPoint;
	}

	public void setUserPoint(int userPoint) {
		this.userPoint = userPoint;
	}

	public int getUserVictory() {
		return this.userVictory;
	}

	public void setUserVictory(int userVictory) {
		this.userVictory = userVictory;
	}

	public Tournement getTournement() {
		return this.tournement;
	}

	public void setTournement(Tournement tournement) {
		this.tournement = tournement;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}