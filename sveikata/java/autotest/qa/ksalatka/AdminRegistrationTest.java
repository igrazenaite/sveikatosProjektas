package autotest.qa.ksalatka;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.openqa.selenium.Alert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Factory;
import org.testng.annotations.Test;
import org.testng.collections.Lists;

import com.thoughtworks.xstream.XStream;

import page.MainPage;

public class AdminRegistrationTest {
	WebDriver driver = new FirefoxDriver();
	MainPage mainPage = new MainPage(driver);





	@BeforeTest
	public void testSetup() {
		driver.get("http://localhost:8081/#/");

	}

	@BeforeMethod
	public void loginAsAdmin() {
		mainPage.inputUsername("admin1");
		mainPage.inputPassword("admin1");
		mainPage.clickLogin();
		mainPage.clickRegisterNewUser();
	}

	@AfterMethod
	public void Disconnect() {
		mainPage.clickMenu();
		mainPage.clickLogOut();
	}

	@AfterTest
	public void CloseBrowser() {
		driver.close();
	}

	@Test
	public void AdminRegistration() {
		XStream xStream = new XStream();
		XStream.setupDefaultSecurity(xStream);
		xStream.allowTypes(new Class[] { RegistrationData.class });
		RegistrationData adminData = new RegistrationData();
		
		mainPage.clickRegisterAdmin();
		mainPage.inputFirstName(adminData.getName());
		mainPage.inputLastName(adminData.getLastname());
		mainPage.inputUsername(adminData.getUsername());
		mainPage.inputPassword(adminData.getPassword());
		mainPage.inputConfirmPassword(adminData.getPassword());
		mainPage.clickRegister();
		Alert alert = driver.switchTo().alert();
		String text = alert.getText();
		Assert.assertEquals("Registracija sėkminga!", text, "Registration failed");
		alert.dismiss();

	}

	public static List<String> getTestData(String fileName) throws IOException {
		List<String> records = new ArrayList<String>();
		String record;

		BufferedReader file = new BufferedReader(new FileReader(fileName));
		while ((record = file.readLine()) != null) {
			records.add(record);
		}
		file.close();
		return records;

	}


}
