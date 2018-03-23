package lt.sveikata.user;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping(value = "/user")
@CrossOrigin(origins="*")
public class UserController {

	@Autowired
	private UserService userService;
	

	@Autowired
	private UserRepository userRepository;

	
	@RequestMapping(value = "/allUsers", method = RequestMethod.GET)
	@PreAuthorize("hasRole('ADMIN')")
	public List<UserForClient> giveAllUser() {
		return getUserService().receiveAllUsers();
	}

	@RequestMapping(value = "/admin/addNewUser", method = RequestMethod.POST)
	@PreAuthorize("hasRole('ADMIN')")
	@ResponseStatus(HttpStatus.CREATED)
	public void createUser(@RequestBody final AddNewUser newUser) {
		userService.addNewUser(newUser);
	}

	@PutMapping("/user/{userId}/suspend")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<User> updateUser(@PathVariable(value = "userId") String userName) {

		User user = userRepository.findByUserName(userName);
		user.setRole("SUSPENDED");
		user.setSuspended(true);

		User updatedUser = userRepository.save(user);
		return ResponseEntity.ok(updatedUser);
	}

	@RequestMapping(value = "{userRole}/{userId}/changePassword", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
//	@PreAuthorize("hasRole('PHARMACIST')")
	public @ResponseBody void updateExistingUser(@RequestBody final NewPass pass, 
			@PathVariable (value="userId") Long userId,@PathVariable (value="userRole") String userRole) {
		userService.updateUser(pass, userId, userRole);
	}

	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}
}