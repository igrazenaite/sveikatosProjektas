package page;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class MainPage extends AbstractPage{

	//inputs
	@FindBy(id = "inputFirstName")
	private WebElement inputFirstname;
	@FindBy(id = "inputLastName")
	private WebElement inputLastname;
	@FindBy(id = "inputUserName")
	private WebElement inputUsername;
	@FindBy(id = "inputPassword")
	private WebElement inputPassword;
	@FindBy(id = "inputRepeatedPassword")
	private WebElement inputConfirmPassword;
	@FindBy(id = "inputPersonalCode")
	private WebElement inputPersonalCode;
	@FindBy(id = "inputWorkplace")
	private WebElement inputWorkPlace;

	
	
	//buttons
	@FindBy (id= "submitForm")
	private WebElement buttonRegister;
	@FindBy (id = "login")
	private WebElement buttonLogin;
	@FindBy (className = "newUserRegistration")
	private WebElement buttonUserRegistration;
	@FindBy(className = "adminRegistration")
	private WebElement buttonAdminNewRegistration;
	@FindBy(className = "registerNewPatient")
	private WebElement buttonRegisterNewPatient;
	@FindBy (className = "registerDoctor")
	private WebElement  buttonRegisterNewDoctor;
	@FindBy(className = "registerPharmacist")
	private WebElement buttonRegisterNewPharmacist;
	@FindBy(className = "registerAdmin")
	private WebElement buttonRegisterNewAdmin;
	@FindBy(className = "newUserRegistration")
	private WebElement buttonCreateNewUser;
	@FindBy(className = "userPopoverMenu")
	private WebElement buttonMenu;
	@FindBy(className = "logOut")
	private WebElement buttonLogOut;
	@FindBy(id = "generateDateOfBirthButton")
	private WebElement buttonGenerateDate;
	
	
	

	public MainPage(WebDriver driver) {
		super(driver);
	}
		public void inputFirstName(String name) {
			inputFirstname.sendKeys(name);
		}
		public void inputLastName(String lastname) {
			inputLastname.sendKeys(lastname);
		}
		public void inputUsername(String username) {
			inputUsername.sendKeys(username);
		}
		public void inputPassword(String password) {
			inputPassword.sendKeys(password);
		}
		public void inputConfirmPassword(String confirm) {
			inputConfirmPassword.sendKeys(confirm);
		}
		public void inputPersonalCode(String code) {
			inputPersonalCode.sendKeys(code);
		}
		public void inputWorkPlace(String workingPlace) {
			inputWorkPlace.sendKeys(workingPlace);
		}
		public void clickRegister(){
			buttonRegister.click();
		}
		public void clickLogin() {
			buttonLogin.click();
		}
		public void clickRegisterAdmin() {
			buttonRegisterNewAdmin.click();
		}
		public void clickRegisterPharmacist() {
			buttonRegisterNewPharmacist.click();
		}
		public void clickRegisterDoctor() {
			buttonRegisterNewDoctor.click();
		}
		public void clickRegisterPatient() {
			buttonRegisterNewPatient.click();
		}
		public void clickRegisterNewUser() {
			buttonCreateNewUser.click();
		}
		public void clickMenu() {
			buttonMenu.click();
		}
		public void clickLogOut() {
			buttonLogOut.click();
		}
		public void clickGenerateDate() {
			buttonGenerateDate.click();
		}
	
	
	

}
