import HelloService from "../src/services/hello-service";
let helloService: HelloService = null;
describe("Example", () => {
  beforeAll(() => {
    helloService = new HelloService();
  });
  it("example should return a valid value", () => {
    expect(helloService.getHelloString("A")).toEqual("Hello A!");
  });
});
