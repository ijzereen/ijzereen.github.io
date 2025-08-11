---
title: "bm25와 한국어 토크나이저를 활용한 Lexical Search 개선"
author: Ijzereen
date: 2025-08-11 20:30:00 +0900
categories: ["NLP", "AI"]
tags: [bm25s, Kkma, OKT, Kiwi]
---

## Lexical Search

Lexical Search는 기본적인 키워드 기반 검색 방법으로 문장 / 쿼리에 담긴 텍스트를 기반으로 검색한다. 

간단한 Lexical 검색 예시를 들어보면 다음과 같다.

`Query` : YSL 바지 하나 왜 좀 사입던지 해

| id | 문장 |
| ----- | ---|
| 1 | 내 돈은 너무 깨끗해 내 두 손은 너무 더러워
| 2 | 다리를 뻗어 캐피털 바지에
| 3 | 내가 신은 신발은 YSL, 내 기분처럼 구두굽이 되게 높지
| 4 | 이번 신상 YSL 바지 예쁘더라, 하나 사야겠어.

1번 문장 :  None  
2번 문장 : `바지`  
3번 문장 :  `YSL`  
4번 문장 :  `YSL`, `바지`, `하나`

4번 문장이 가장 유사한 키워드가 많기 때문에 4번 문장을 선택한다.  
이렇게 사용자의 쿼리와 문장을 키워드 단위로 분해하여 유사한 문장을 선택한다.


# BM25

BM25는 Best Matching 25의 약자로 Lexical Search에서 사용되는 대표적인 알고리즘 중 하나이다.  

주어진 질의와 문서들 간의 관련성을 평가하는데 SOTA( State-of-the-art )의 성능을 보이며, `elastic search` 에서도 기본 유사도 검색 알고리즘으로 채택했다.

TF(Term Frequency, 단어의 등장 빈도)와 IDF(Inverse Document Frequency, 역문서빈도)를 수식에서 이용하지만, 잘 알려진 TF-IDF 알고리즘의 수식과는 살짝 다르다.

`TF` : 문서 안에 해당 단어가 몇번 등장했는지 의미한다.  
예를 들어 *사과가 사과해*라는 문장에서는 사과의 `TF` 는 2이다.

`IDF` : 전체 문서 중 해당 단어가 얼마나 희귀한지를 나타낸다. 문서 빈도의 inverse 값이라 생각하면 좋다.  
예를 들어 한국어에서 (이)가, 는 등의 흔한 단어는 많이 등장하므로 `IDF` 값이 낮다.

여러 문서들 중 문서 $D$와 사용자 질의 $Q$의 연관성은 다음과 같이 계산한다.  

BM25s는 다음 조건을 만족할수록 더 큰 점수를 부여한다.
- 문서 내용에 검색어 출현 빈도가 높을수록
- 문서 내용이 짧을수록
- 다른 문서에 검색어가 출현하지 않을수록


위에서 예시를 들었던 문서를 바탕으로 BM25를 설명해보겠다.

$$
\begin{align}
\text{score}(D, Q) &= \sum_{i=1}^{n} \text{IDF}(q_i) \cdot \text{TF}(q_i) \\
&= \sum_{i=1}^{n} \text{IDF}(q_i) \cdot \frac{f(q_i, D) \cdot (k_1 + 1)}{f(q_i, D) + k_1 \cdot \left(1 - b + b \cdot \frac{\lvert D \rvert}{\text{avgdl}}\right)} \\
&= \sum_{i=1}^{n} \log\left(1 + \frac{N - n_{q_i} + 0.5}{n_{q_i} + 0.5}\right) \cdot \frac{f(q_i, D) \cdot (k_1 + 1)}{f(q_i, D) + k_1 \cdot \left(1 - b + b \cdot \frac{\lvert D \rvert}{\text{avgdl}}\right)}
\end{align}
$$
사용자의 질의 $Q$에 대해 문서(여기서는 문장)$D$와의 BM25 점수를 계산하는 공식이다.  
질의와 문서들 모두 기본적인 토큰화는 된 후에 BM25 알고리즘을 작동시킨다.

### TF
- $f(q_i, D)$ : 사용자의 질의 $Q$의 $i$번째 단어인 $q_i$가 문서 $D$에 몇번 등장했는지 반환한다. (**문서 내용에 검색어 출현 빈도가 높을수록**)
- $\frac{\lvert D \rvert}{\text{avgdl}}$ : 문서들의 평균 길이에 대한 현재 문서의 길이를 의미한다. (**문서 내용이 짧을수록**)
- $b$, $k_1$ : 조정 가능하지만, 보통 상수로 고정되어있는 파라미터이다.


### IDF

$$\text{IDF}(q_i) = \log\left(1 + \frac{N - n_{q_i} + 0.5}{n_{q_i} + 0.5}\right)$$

- $N$ : 전체 문서의 수
- $n_{q_i}$ : $q_i$가 포함된 문서의 수

따라서 $n_{q_i}$가 낮을수록 $IDF$값은 높아지기 때문에 **다른 문서에 검색어($n_{q_i}$)가 출현하지 않을수록** BM25 점수는 높아진다.

## BM25S

> BM25S is designed to provide a fast, low-dependency and low-memory implementation of BM25 algorithms in Python.

BM25s 공식문서에 올라와있는 설명으로 파이썬에서 BM25로 키워드 검색을 할 수 있는 알고리즘이다.

```bash
pip install bm25s
```
BM25s 라이브러리를 설치한다.

```python
import bm25s

말뭉치들 = [
    "고양이는 만족할 때 그르렁거린다.",
    "개는 사람의 친구이며 놀이를 좋아한다.",
    "새는 날개로 하늘을 난다.",
    "물고기는 아가미로 호흡한다.",
    "물고기는 그르렁거리지 않는다."
]

# 문서들을 토큰화 시킨 다음 저장한다.
말뭉치_BM25토큰화 = bm25s.tokenize(말뭉치들)
검색기 = bm25s.BM25(corpus=말뭉치들) #검색 결과를 반환할 때 사용할 원문들을 저장한다.
검색기.index(말뭉치_BM25토큰화) #검색할 때 사용하기 위해 토큰 데이터 구조를 생성한다.

# You can now search the corpus with a query
질의 = "고양이는 만족할 때 뭐해?"
질의_토큰화 = bm25s.tokenize(질의)
문서들, 점수들 = 검색기.retrieve(질의_토큰화, k=2)
print(f"Best result (score: {점수들[0, 0]:.4f}): {문서들[0, 0]}")

# Happy with your index? Save it for later...
검색기.save("bm25s_index_animals")
```
실행하면 다음 결과가 출력된다.
> Best result (score: 1.1990): 고양이는 만족할 때 그르렁거린다.

근데 여기서 토큰화된 결과를 살펴보면 다음과 같다.
> 질의_토큰화 = Tokenized(  
    "ids": [0: [0, 1, 2] ],  
    "vocab": ['고양이는': 0'만족할': 1'뭐해': 2],)  

> 문서들[0,0]의 데이터 = Tokenized(  
    "ids": [ 0: [0, 1, 2] ],  
    "vocab": [ '고양이는': 0 '만족할': 1 '그르렁거린다': 2 ],)  

토큰화의 결과가 단순 띄워쓰기 정도이다. 
`고양이는` 은 `고양이` 와 `는` 으로 쪼개야한다.  
`뭐해` 는 `뭐` + `하` + `어` 정도로 세부적으로쪼개야한다.

따라서 한글 데이터를 바탕으로 BM25 알고리즘을 이용한 lexical 검색을 수행할 때는 추가적인 토크나이저가 필요하다. 

# 한국어 토크나이저

한국어 토크나이저는 한국어의 특성에 알맞게 토큰화시킬 수 있어야한다.  
우리가 학생 때 배운 것처럼 어간, 어미, 어근, 접사 등 형태소 단위의 토큰화가 가능해야한다는 것이다.

이를 위해 우리는 세가지 토크나이저를 가지고 한번 테스트를 해보려한다.  

[OpenKoreaText](https://github.com/open-korean-text/open-korean-text?tab=readme-ov-file){: target="_blank"} : 트위터에서 개발한 오픈소스 한국어 토크나이저  
[Kkma](https://github.com/YuJungChae/kkma_python){: target="_blank"} : 서울대에서 개발한 한국어 토크나이저  
[Kiwi(Korean Intelligent Word Identifier)](https://github.com/bab2min/Kiwi){: target="_blank"} : 오픈소스 한국어 토크나이저

`Kiwi` 의 경우, *split_complex*라는 옵션을 통해 세부적인 토크나이징 여부를 설정할 수 있다.

```python
from konlpy.tag import Okt
from konlpy.tag import Kkma
from kiwipiepy import Kiwi

오텍코 = Okt()
꼬꼬마  = Kkma()
키위 = Kiwi()

text = "다음 휴가에는 부산국제락페스티벌을 가고싶어요."

print('오텍코 형태소 분석 :',오텍코.morphs(text))
print('꼬꼬마 형태소 분석 :',꼬꼬마.morphs(text))

키위_형태소_러프하게 = 키위.tokenize(text, split_complex=False)
키위_형태소_세부적으로 = 키위.tokenize(text, split_complex=True)

키위_러프한_분석결과 = [token.form for token in 키위_형태소_러프하게]
키위_세부적인_분석결과 = [token.form for token in 키위_형태소_세부적으로]

print('키위 형태소 분석(rough) :', 키위_러프한_분석결과)
print('키위 형태소 분석(detail) :', 키위_세부적인_분석결과)
```

결과는 다음과 같다.
>오텍코 형태소 분석 : ['다음', '휴가', '에는', '부산', '국제', '락페스티벌', '을', '가고싶어요', '.']  
꼬꼬마 형태소 분석 : ['다음', '휴가', '에', '는', '부산', '국제', '락', '페스티벌', '을', '가', '고', '싶', '어요', '.']  
키위 형태소 분석(rough) : ['다음', '휴가', '에', '는', '부산', '국제', '락', '페스티벌', '을', '가', '고', '싶', '어요', '.']  
키위 형태소 분석(detail) : ['다음', '휴가', '에', '는', '부산', '국제', '락', '페스티벌', '을', '가', '고', '싶', '어', '요', '.']  

육안으로 봤을 때, `꼬꼬마` 와 `키위 형태소 분석(rough)` 의 토크나이징 정도는 유사해보인다.  
`오텍코` 의 성능은 비교적 떨어져보인다.

그런데 토크나이저를 사용하다보면 **중의적인 토크나이징**이 가능할 때 서로 다른 결과를 내놓는다.

`전용역`
>오텍코 형태소 분석 : ['전', '용역']  
꼬꼬마 형태소 분석 : ['전용', '역']  
키위 형태소 분석(rough) : ['전', '용역']  
키위 형태소 분석(detail) : ['전', '용역']

`고물가`
>오텍코 형태소 분석 : ['고물', '가']  
꼬꼬마 형태소 분석 : ['고물가']  
키위 형태소 분석(rough) : ['고', '물가']  
키위 형태소 분석(detail) : ['고', '물가']  

`개인기`
>오텍코 형태소 분석 : ['개', '인기']  
꼬꼬마 형태소 분석 : ['개인기']  
키위 형태소 분석(rough) : ['개인기']  
키위 형태소 분석(detail) : ['개인기']  

# 한국어 토크나이저 + BM25


위에서 볼 수 있듯이 **토크나이징 모델에 따라 토큰화 결과**가 다르다.  
수행할 task의 문장들을 여럿 넣어보며 **현재 task에서 가장 적절한 토크나이징 모델이 무엇인지 결정**하는 것이 중요할 것이다.

원하는 토크나이저를 골랐다면, 해당 토크나이저로 1차 토크나이징을 한뒤 BM25에 적용하면 된다.

위에 올린 bm25코드 중간에 해당 코드를 추가하고, 사용자 질의 역시 토크나이징해서 쿼리로 넣으면 된다.

```python
from konlpy.tag import Kkma
#...
꼬꼬마  = Kkma()

말뭉치들 = [str(꼬꼬마.morphs(문장)) for 문장 in 말뭉치들]
#...
```

