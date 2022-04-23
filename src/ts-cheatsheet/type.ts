type Member = {
  login: string;
  password: string;
};

type Admin = Member & {
  permissions: Array<string>;
};

(() => {
  const member: Member = { login: 'user', password: '123456' };
  console.info(member);
  const admin: Admin = { ...member, permissions: [] };
  console.info(admin);
})();

// type assertion tricks
const a = 'abc' as any as number;

console.info(a);

type position = 'left' | 'right' | 'top' | 'bottom';

const element: { tag: string; position: position } = {
  tag: 'h1',
  position: 'top',
};

console.info(element);

type status = 0 | 1 | 2;
const user: { name: string; status: status } = {
  name: 'JSBaseVietnam',
  status: 0,
};

console.info(user);

interface Options {
  width: number;
}

const configure = (opt: Options | 'auto') => {
  console.info(opt);
};

configure('auto');
configure({ width: 123 });

const stats = { counter: 1 };
stats.counter = 2;
const callAPI = (url: string, method: 'GET' | 'POST') => {
  console.error(`Call API ${url} ${method}`);
};
const handleRequest = (url: string | null, method: 'GET' | 'POST') => {
  if (url === null) {
    return;
  }
  callAPI(url, method);
};
const req = {
  url: 'https://api.jsbasevietnam.com/v1/posts',
  method: 'GET',
} as const;
handleRequest(req.url, req.method);

const divide1 = (n?: number | null) => {
  // if (n == null || n == undefined) {
  //   return 1;
  // }
  return 1 / (n ?? 1);
};
console.info(divide1(5));

const divide2 = (m?: number | null) => {
  return 1 / m!;
};
console.info(divide2(null));

const oneMillion = 1e6;
console.info(
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(oneMillion),
);

const oneHundred: bigint = BigInt(100);

// Creating a BigInt via the literal syntax
const anotherHundred: bigint = 100000000000000000000n;

console.error(oneHundred, anotherHundred);

const userServiceInjectionKey1 = Symbol('USER_SERVICE');
const userServiceInjectionKey2 = Symbol('USER_SERVICE');
console.error(userServiceInjectionKey1, userServiceInjectionKey2);
// console.error(userServiceInjectionKey1 === userServiceInjectionKey2);
