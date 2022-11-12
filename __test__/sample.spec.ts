class Example {
  constructor(private title: string) {
    this.title = title;
  }
  public go() {
    return 1;
  }
  public stop() {
    return 0;
  }
}
describe('Mock example', () => {
  describe('Mock a method of class', () => {
    const exampleGoMock = jest
      .spyOn(Example.prototype, 'go')
      .mockImplementation(() => {
        return 1;
      });
    it('test go function', () => {
      const example = new Example('test');
      example.go();

      expect(exampleGoMock).toBeCalledTimes(1);
      expect(exampleGoMock.mock.results[0].value).toEqual(1);
    });
  });
});
// Ref : https://stackoverflow.com/questions/62564800/how-to-assert-data-type-with-jest
describe('Assertions', () => {
  beforeAll(() => {});
  // Equity assertions: 1 == '1'
  describe('Sameness assertions', () => {
    const objectA = { a: 1, b: { c: 2 } };
    const objectB = { a: 1, b: { c: 2.0 } };

    beforeAll(() => {});
    it('a should equal b', () => {
      expect(objectA).toEqual(objectB);
    });
    it('a should equal b', () => {
      expect(objectA).toStrictEqual(objectB);
    });
  });
  describe('Datatype assertions', () => {
    it('should be a number', () => {
      const a = 1;
      expect(typeof a).toBe('number');
    });
    it('should be an instance of Example', () => {
      const example = new Example('Example');
      expect(example).toBeInstanceOf(Example);
    });
  });
  describe('Special value assertions', () => {
    it('false should be false', () => {
      const a = false;
      expect(a).toBeFalsy();
    });
    it('null should be false', () => {
      const b = null;
      expect(b).toBeFalsy();
    });
    it('undefined should be false', () => {
      const c = undefined;
      expect(c).toBeFalsy();
    });
  });
});
