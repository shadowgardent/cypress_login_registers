describe("API Replay Test - Register", () => {
  it("should replay register API 10 times with different emails", () => {
    // 🔸 รอ 30 วิ (API จะพร้อมทำงานตามที่โจทย์กำหนด)
    cy.wait(31000);

    // 🔸 เตรียม email 10 ตัว
    const emails = Array.from({ length: 10 }, (_, i) => `testuser${i + 1}@mail.com`);

    // 🔸 โหลด request template ที่เคย intercept ได้
    cy.fixture("intercepted_register.json").then((apiData) => {
      const registerRequest = apiData[0]; // ใช้ request แรกเป็น template

      emails.forEach((email, index) => {
        const body = { ...registerRequest.requestBody, email };

        cy.request({
          method: registerRequest.method,
          url: registerRequest.url,
          body,
          failOnStatusCode: false, // ให้ผ่านแม้เจอ error (เช่น email ซ้ำ)
        }).then((res) => {
          const result = {
            round: index + 1,
            email,
            status: res.status,
            body: res.body,
          };

          // ✅ log ออก console ของ Cypress
          cy.log(`Round ${index + 1}: Status ${res.status}`);
          cy.log(`Response: ${JSON.stringify(res.body, null, 2)}`);

          // ✅ เขียนไฟล์ JSON เก็บผลลัพธ์
          cy.writeFile(
            `cypress/results/api-replay-round-${index + 1}.json`,
            result,
            { flag: "w" } // overwrite file
          );
        });
      });
    });
  });
});
