// 分割代入
//--配列--

//分割代入による値の取り出し方
//変数宣言するとき、[]で囲む
//右側(list)の〇番目の値が、左の〇番目の変数に代入される。

const list = ["練習", "課題"];
const [item0, item1] = list;
console.log(item0, item1); // 練習　課題

// --オブジェクト--
//分割代入による値の取り出し方
//変数を宣言するとき、{}で囲む
//左側の変数名に一致する
//右側(userInfo)のプロパティが取得できる

const userInfo = {
  city: "fukuoka",
  country: "japan"
};

const { city, country } = userInfo;
console.log(city, country); // fukuoka japan

//変数名を変更する
//既に使用されている変数名があるとき等に使う

const userInfo2 = {
  name: "テックん",
  age: "20"
};

const { name: userName, age: userAge } = userInfo2;
console.log(userName, userAge); // テックん 20

// --デフォルト値--
//オブジェクトの分割代入において
//プロパティが存在しない場合の
//デフォルト値が設定できる

const userInfo3 = {
  age: "20"
};

const { name = "noname", age } = userInfo3;
console.log(name, age); // noname 20

//関数の引数にデフォルト値を設定する
const welcomeMessage = (username = "noname") => {
  const message = `こんにちわ、${username}さん`;
  console.log(message);
};
welcomeMessage("jimmy"); // こんにちわ、jimmyさん
welcomeMessage(); // こんにちわ、nonameさん
//スプレット構文
//--配列編--

//・配列を展開する
//[]が外れるイメージ

const list1 = ["a", "b"];
console.log(list1); // ["a", "b"];
console.log(...list1); // a b

//配列のコピー・結合
//「...」で展開して、再度{}で囲むイメージ
//「,」で区切ることで複数の配列を結合できる。

const list3 = [1, 2];
const list4 = [3, 4];
const newlist = [10, 11];

const list5 = [...list3];
console.log(list5); // [1,2] コピー

const list6 = [...list3, ...list4, ...newlist];
console.log(list6); //[1,2,3,4,10,11] 結合

// -- オブジェクト編 --
// オブジェクトのコピー
// 「...」で展開して、再度{}で囲むイメージ
const obj1 = {
  title: "t1",
  content: "c1"
};

const obj2 = { ...obj1 };
console.log(obj2); // {title: "t1", content: "c1"}

const obj3 = {
  title: "練習",
  content: "raisetech"
};
const obj4 = { ...obj3 };
console.log(obj4); // {title: "練習", content: "raisetech"}

//オブジェクトの省略記法
//userInfoオブジェクトのプロパティnameに
//変数nameの値を設定している
//プロパティageに変数ageを。。

const newname = "てっくん";
const newage = 20;

const userInfo6 = {
  name: newname,
  age: newage
};

//プロパティ名と変数名が同じなら省略可能

const namae = "てっくん";
const nenrei = 20;

const userInfo7 = {
  namae,
  nenrei
};

console.log(userInfo7); //namae: "てっくん", nenrei: 20}

//配列の処理
// -- map関数 --

//配列を順番に処理して新しい配列を生成

//[例]数値を格納した配列の各要素を2倍した
//新しい配列を生成する
//→自動で配列の各要素に1つずつアクセス
//（繰り返し処理）
// →map関数の中に、さらに関数を書く
// →関数の第一引数は配列の各要素
// →第二引数は何番目かを表す数値
// →引数は省略することも可能
// →加工した値（要素を2倍した値）をreturnしている

const li1 = [1, 2, 3, 4, 5];
const li2 = li1.map((item, index) => {
  console.log(`要素:${item}`, `index:${index}`);
  return item * 4;
});
console.log(li2);

// 要素:1　index:0
// 要素:2　index:1
// 要素:3　index:2
// 要素:4　index:3
// 要素:5　index:4
// [4, 8, 12, 16, 20]

//-- filter --
//・配列を順番に処理して条件に一致する
//新しい配列を生成

//[例]数値を格納した配列から要素を
//60以上に絞り込んだ新しい配列を生成する
//→map関数と同じ要領
//→絞り込みを行う関数なので条件を指定する
//→60以上かどうかの真偽値をreturnしている

const li3 = [10, 50, -40, 85, 100, 70];
const li4 = li3.filter((item, index) => {
  console.log(`要素:${item}`, `index:${index}`);
  return item >= 85;
});

console.log(li4); //[85, 100]

// Null合体演算子
// -- Null合体演算子(ES2020) --
// ・記号「??」を使う
// errorMessageがnull/undefinedのとき
// defaultMessageの値が評価される
// nullish

// ・空文字や0などはnullishではないのでerrorMessageが評価される

let defaultMessage = "エラー無し";
let errorMessage = null;

let message = errorMessage ?? defaultMessage;
console.log(message); // エラー無し

errorMessage = undefined;
message = errorMessage ?? defaultMessage;
console.log(message); // エラー無し

errorMessage = "";
message = errorMessage ?? defaultMessage;
console.log(message); // ""

//・【問題】コンソールが表示されるのは？？
const emptyStr = "";
const zero = 0;
const emptyArr = [];
const nullVal = null;
const undefinedVal = undefined;

emptyStr ?? console.log("A");
emptyStr || console.log("B");
zero ?? console.log("C");
zero || console.log("D");
emptyArr ?? console.log("E");
emptyArr || console.log("F");
nullVal ?? console.log("G");
nullVal || console.log("H");
undefinedVal ?? console.log("I");
undefinedVal || console.log("J");

// ・クラス構文
// ・class:クラス
// 設計図・金型のようなもの
// ・constructor:コンストラクタ
// 初期化処理を書く特別な関数
// 自由に引数を定義できる
// ・property:プロパティ
// this.name/this.age
// クラス構成要素を定義する
// ・method:メソッド
// クラスに定義する関数(greet)

class User {
  constructor(country, city) {
    this.country = country;
    this.city = city;
  }

  greet() {
    console.log(
      `こんにちは！${this.country}生まれです`,
      `${this.city}出身です`
    );
  }
}

// ・クラスの使い方
// 「newクラス名(引数)」の形式でかく
// 「Userクラスから生成されたインスタンスを変数userに格納する」と表現
// インスタンス = クラス（設計図・金型）から生成された実際のデータ
// インスタンスを作製するときにconstructorが実行される
// user.XXで定義されたプロパティにアクセスしたり、メソッドを実行できる。

const user = new User("japan", "fukuoka");
console.log(user.country); // japan
user.greet(); // こんにちは！japan生まれです fukuoka出身です
