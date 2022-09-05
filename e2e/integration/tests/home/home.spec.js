import { Home } from "../../functions/home/home";

describe("GIVEN the Home Page", () => {
  const home = new Home();
  it("THEN the Home Page is loaded", () => {
    home.go();
  });
});
