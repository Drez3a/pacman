using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GhostMove : MonoBehaviour {
	public Transform[] waypoints;
	int cur = 0;
	// index variable that keeps track of the waypoint that Blinky is currently walking towards,
	// the current waypoint can always be accessed with waypoints[cur].
	
	public float speed = 0.3f;
	//a movement speed variable
	
	
	// Update is called once per frame
	// (because it's meant for physics stuff like movement)
	void FixedUpdate () {

		// Waypoint not reached yet? then move closer
		// we used the Vector2.MoveTowards function to calculate a point that is a bit closer to the waypoint. 
		// Afterwards we set the ghost's position with rigidbody2D.MovePosition.
	    if (transform.position != waypoints[cur].position) {
	        Vector2 p = Vector2.MoveTowards(transform.position,
	                                        waypoints[cur].position,
	                                        // GameObject.Find("pacman").transform.position,
	                                        speed);
	        GetComponent<Rigidbody2D>().MovePosition(p);
	    }
	    // Waypoint reached, select next one
	    // If the waypoint is reached then we increase the cur variable by one.
	    // We also want to reset the cur to 0 if it exceeds the list length.
	    // We could use something like if (cur == waypoints.Length) cur = 0, but using the modulo (%) operator makes this look a bit more elegant.
	    else cur = (cur + 1) % waypoints.Length;

	    // Animation
	    Vector2 dir = waypoints[cur].position - transform.position;
	    GetComponent<Animator>().SetFloat("DirX", dir.x);
	    GetComponent<Animator>().SetFloat("DirY", dir.y);
	}

	// Collision trigger
	void OnTriggerEnter2D(Collider2D co) {
		// The ghosts should destroy Pac-Man upon colliding with him.
		// feel free to decrease Pac-Man's lives or show a Game Over screen at this point.
    	if (co.name == "pacman")
	        Destroy(co.gameObject);
	}
}
