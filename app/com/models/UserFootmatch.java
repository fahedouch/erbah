package com.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the user_footmatch database table.
 * 
 */
@Entity
@Table(name="user_footmatch")
@NamedQuery(name="UserFootmatch.findAll", query="SELECT u FROM UserFootmatch u")
public class UserFootmatch implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private UserFootmatchPK id;

	@Column(name="user_goal")
	private int userGoal;

	//bi-directional many-to-one association to Footmatch
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="match_id")
	private Footmatch footmatch;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumns({
									@JoinColumn(name="user_id", referencedColumnName="user_id"),
									@JoinColumn(name="user_pseudo", referencedColumnName="user_pseudo")
	})
	private User user;

	public UserFootmatch() {
	}

	public UserFootmatchPK getId() {
		return this.id;
	}

	public void setId(UserFootmatchPK id) {
		this.id = id;
	}

	public int getUserGoal() {
		return this.userGoal;
	}

	public void setUserGoal(int userGoal) {
		this.userGoal = userGoal;
	}

	public Footmatch getFootmatch() {
		return this.footmatch;
	}

	public void setFootmatch(Footmatch footmatch) {
		this.footmatch = footmatch;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}