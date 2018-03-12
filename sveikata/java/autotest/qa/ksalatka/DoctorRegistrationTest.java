package autotest.qa.ksalatka;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import page.MainPage;


public class DoctorRegistrationTest {
	WebDriver driver = new FirefoxDriver();
	MainPage mainPage = new MainPage(driver);
	private String usernames;

	public DoctorRegistrationTest(String usernames) {
		this.usernames = usernames;
	}

	@DataProvider
	public static List<String> data() throws IOException {
		return getTestData("src/test/resources/doctor/usernames.csv");
	}

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
	public void DoctorRegistration() {
		mainPage.clickRegisterDoctor();
		mainPage.inputFirstName("DocName");
		mainPage.inputLastName("DocLastname");
		mainPage.inputUsername(usernames);
		mainPage.inputPassword("doctortest");
		mainPage.inputConfirmPassword("doctortest");
		Select doctorSpecialization = new Select(driver.findElement(By.className("specialization")));		
		doctorSpecialization.selectByIndex((int)Math.ceil(Math.random()*3));
		mainPage.clickRegister();
		Alert alert = driver.switchTo().alert(); 
		String text = alert.getText(); 		
		Assert.assertEquals("Registracija sėkminga!",text, "Registration failed");
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
