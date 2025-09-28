describe("Login Testing (UI + API)", () => {
  beforeEach(() => {
    // เปิดหน้าเว็บก่อนทุก test case
    cy.visit("https://robot-lab-five.vercel.app/");
  });

  it("should login Success (UI + API)", () => {
    // ✅ ทดสอบผ่านหน้าเว็บ
    cy.get(".nav-btn-login").click();
    cy.get("#loginEmail").type("test_1759043089679@mail.com");
    cy.get("#loginPassword").type("123456");
    cy.get("form > button").click({ force: true });

    // ตรวจสอบข้อความที่ขึ้นบนหน้าเว็บ
    cy.get(".message").should("have.text", "Login successful! Welcome, Test!");

    // 📸 แคปหน้าจอหลังจาก login สำเร็จ
    cy.screenshot("login-success-ui");

    // ✅ ยิง API โดยตรงเพื่อตรวจสอบผลลัพธ์อีกชั้น
    cy.request({
      method: "POST",
      url: "https://robot-lab.onrender.com/api/auth/login",
      body: {
        email: "test_1759043089679@mail.com",
        password: "123456",
      },
      failOnStatusCode: false,
    }).then((res) => {
      cy.log("Response Body (Success):", JSON.stringify(res.body, null, 2));
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("token");

      // 📸 แคปหน้าจอผล API response
      cy.screenshot("login-success-api");
    });
  });

  it("should login Fail (UI + API)", () => {
    // ❌ ทดสอบผ่านหน้าเว็บ
    cy.get(".nav-btn-login").click();
    cy.get("#loginEmail").type("wrong@gmail.com");
    cy.get("#loginPassword").type("wrongpass");
    cy.get("form > button").click({ force: true });

    // ตรวจสอบข้อความ error ที่ขึ้นบนหน้าเว็บ
    cy.get(".message").should("contain.text", "Invalid");

    // 📸 แคปหน้าจอหลังจาก login fail
    cy.screenshot("login-fail-ui");

    // ❌ ยิง API โดยตรงเพื่อตรวจสอบผลลัพธ์อีกชั้น
    cy.request({
      method: "POST",
      url: "https://robot-lab.onrender.com/api/auth/login",
      body: {
        email: "wrong@gmail.com",
        password: "wrongpass",
      },
      failOnStatusCode: false, // ให้ผ่านแม้ status 401
    }).then((res) => {
      cy.log("Response Body (Fail):", JSON.stringify(res.body, null, 2));
      expect(res.status).to.eq(401);
      expect(res.body).to.have.property("message");

      // 📸 แคปหน้าจอผล API response
      cy.screenshot("login-fail-api");
    });
  });
});
