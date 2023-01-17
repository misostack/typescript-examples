import 'reflect-metadata';

function Injectable(constructor: Function) {
  console.log(constructor);
}

class HttpService {}
class ExampleRepository {}

@Injectable
class ExampleService {
  constructor(
    private httpService: HttpService,
    private exampleRepository: ExampleRepository,
  ) {}
}
// Reflect.getMetadata('design:type', ...)
// Reflect.getMetadata('design:paramtypes',...)
// Reflect.getMetadata('design:returntype', ...)
const metadata = Reflect.getMetadata('design:paramtypes', ExampleService);
metadata.map((m: any) => console.log(m));
