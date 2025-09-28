describe("UI Register Test", () => {
  const registerData = [];

  beforeEach(() => {
    cy.intercept("POST", "https://robot-lab.onrender.com/api/auth/register", (req) => {
      req.continue((res) => {
        registerData.push({
          url: req.url,
          method: req.method,
          requestBody: req.body,
          responseBody: res.body,
          statusCode: res.statusCode,
        });
      });
    }).as("registerApi");

    cy.visit("https://robot-lab-five.vercel.app/");
    cy.get(".logo").should("have.text", "Lobot Framework Lab");
  });

  it("should register Success", () => {
    cy.get(".nav-btn-register").click();
    cy.get("form").should("be.visible");

    cy.get("#firstName").type("Test");
    cy.get("#lastName").type("User");
    cy.get("#email").type(`test_${Date.now()}@mail.com`); // unique email
    cy.get("#password").type("123456");
    cy.get('form button[type="submit"]').click();

    cy.wait("@registerApi");

    // ✅ ตรวจสอบข้อความ success
    cy.get(".message.success")
      .should("contain.text", "Registration successful!");

    cy.screenshot("register-success");
  });

  it("should register Fail", () => {
    cy.get(".nav-btn-register").click();
    cy.get("form").should("be.visible");

    cy.get("#firstName").type("Fail");
    cy.get("#lastName").type("Case");
    cy.get("#email").type("boss2@gmail.com"); // email ที่มีอยู่แล้ว
    cy.get("#password").type("123456");
    cy.get('form button[type="submit"]').click();

    cy.wait("@registerApi");

    // ✅ ตรวจสอบข้อความ error
    cy.get(".message.error")
      .should("contain.text", "already exists");

    cy.screenshot("register-fail");
  });

  after(() => {
    cy.writeFile("cypress/fixtures/intercepted_register.json", registerData, {
      log: true,
    });
  });
});
