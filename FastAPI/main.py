import requests
import pandas as pd
import random

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React 앱의 주소
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)

class Data(BaseModel):
    age: str
    income: str


@app.post("/run-api")
def api_run(input: Data):
    url = "https://kosis.kr/openapi/Param/statisticsParameterData.do"
    params = {
        "method": "getList",
        "apiKey": "N2Q5OGNkNjU0MjNkNTdhNWEwMDRlNjI3N2NmY2YxYTg=",  # 실제 API 키를 사용하세요
        "itmId": "T001",
        "objL1": "ALL",
        "objL2": "ALL",
        "objL3": "",
        "objL4": "",
        "objL5": "",
        "objL6": "",
        "objL7": "",
        "objL8": "",
        "format": "json",
        "jsonVD": "Y",
        "prdSe": "Y",
        "newEstPrdCnt": 1,
        "orgId": 101,
        "tblId": "DT_1EP_2006"
    }

    
    
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        data = response.json()

        income_positions = {
            "85만원 미만": [
                "😏 사회의 숨은 고수... 아니, 생존 마스터! 💰 아낌의 달인!",
                "🍞 알뜰함의 끝판왕! 혹시 쿠폰북 들고 다니시나요? 📖",
                "💡 알바 월급이 생활비... 하지만 꿈과 희망은 가득! 🌈",
                "💳 체크카드 긁을 때마다 심장이 철렁! 🫠",
                "🍚 자취 필수템: 쌀, 달걀, 간장이면 한 달 버틴다! 💪"
            ],
            "85～150만원 미만": [
                "🍜 편의점 VIP 고객! 라면 신상 나오면 제일 먼저 알지? 🤣",
                "🚲 출퇴근은 따릉이! 지하철 기본요금도 부담되는 그 느낌... 😵",
                "🏍️ 배달앱 장바구니에 담고 결제는 취소... 오늘도 직접 해먹는다! 🍳",
                "🎬 영화는 쿠팡플레이로! 극장은 사치... 😭",
                "📅 월급날부터 시작되는 극한의 30일 서바이벌! 🏕️"
            ],
            "150～250만원 미만": [
                "📉 텅장과의 싸움! 매달 25일이 'Doomsday' 😵",
                "☕ 카페 갈 때, '아메리카노만 마실게요'가 입버릇! 💸",
                "📊 월급 루팡 중? 현실은 생활비로 증발 중... 💀",
                "💡 데이터 무제한? No! 와이파이 없는 곳은 공포 그 자체! 📵",
                "🛒 장바구니에 넣고 결제는 나중에... 그리고 결국 삭제 😔"
            ],
            "250～350만원 미만": [
                "📈 이제 막 중산층 입성 준비! 한 걸음씩 위로 가보자고! 🔥",
                "🚆 '대중교통 정기권'이 제일 효율적인 소비라고 믿는 당신! 🎟️",
                "🥑 건강 챙길 여유는 생겼지만, 아보카도는 아직 사치?! 🤔",
                "🎁 친구 생일 선물? 3만원 선에서 고민하는 현실적 감각! 🎂",
                "🍕 1인 1판은 부담... 반반 나눠 먹기가 국룰! 😅"
            ],
            "350～450만원 미만": [
                "💼 직장인 루키! 월급날 저가 커피샵 말고, 스타벅스 가는 여유? ☕",
                "🍖 가끔 삼겹살 3인분 혼자 먹어도 지갑이 안 아픈 단계! 🥩",
                "🚕 지하철 끊기면 택시 탈까 말까 심각한 고민 시작! 🤯",
                "🎿 겨울엔 보드, 여름엔 캠핑! 취미생활 조금씩 늘려가는 중! 🏕️",
                "📅 1년에 한 번쯤은 해외여행 가볼까 고민 시작! ✈️"
            ],
            "450～550만원 미만": [
                "💳 소소한 플렉스 가능! 친구들 사이에서 '한 턱 쏴!' 듣는 수준! 🍖",
                "🏨 가끔 호캉스도 가는 직장인, '일상이 여행'이 목표! ✈️",
                "📱 신형 아이폰 나오면 살까 말까 진지하게 고민하는 단계! 🍏",
                "🍷 '맥주 대신 와인 한 잔 어때?' 분위기 챙기기 시작! 🥂",
                "🛍️ 백화점 쇼핑 가면 가격표부터 안 보고 보는 자신 발견! 😎"
            ],
            "550～650만원 미만": [
                "🚗 출퇴근 지하철? 이제 슬슬 내 차 뽑을 고민하는 단계! 🏎️",
                "💸 2차까지는 걱정 없이 쏠 수 있는 당신, 리스펙! 🙌",
                "🏠 원룸 탈출 D-100?! 내 집 마련을 꿈꾸는 현실적인 자산가! 🔑",
                "🍽️ 레스토랑 갈 때 '추천 메뉴 주세요'라고 말할 수 있는 자신감! 😏",
                "👜 명품 브랜드, 이제 구경만 하는 게 아니라 한 번쯤 고민도 한다! 💎"
            ],
            "650～800만원 미만": [
                "🏠 '부동산 어플' 자주 켜고 있는 당신! 내 집 마련이 눈앞? 👀",
                "🍷 소주 대신 와인으로 갈아탄 당신, 이젠 분위기를 즐긴다! 🎶",
                "💼 '일보다 돈이 많아야 한다'는 철학을 가지기 시작하는 단계! 📊",
                "💳 한 달 카드값 보고도 크게 동요하지 않는 강철 멘탈! 🤖",
                "✈️ 비행기 탈 때 '이코노미? 비즈니스?' 살짝 고민하는 여유! 💺"
            ],
            "800～1000만원 미만": [
                "🤑 좀 치는 사람! 주변에서 '투자 좀 가르쳐줘' 소리 듣지? 🤩",
                "💎 명품 쇼핑할 때 가격을 먼저 안 보게 되는 단계?! 👔",
                "✈️ 이제는 비즈니스석 한 번 타볼까? 승급 고민 시작! 💺",
                "🎭 공연이나 전시회 VIP석이 더 익숙해지는 당신! 🎟️",
                "🏖️ '휴양지? 일주일쯤은 있어야 힐링되지~' 여유를 아는 단계! 🌊"
            ],
            "1000만원 이상": [
                "🚀 대한민국 상위 1% 클럽 가입 완료! 혹시 재벌 3세세요? 👑",
                "🏝️ 월급이 아니라 자산이 돈을 버는 단계... 혹시 FIRE족? 🔥",
                "💰 '이 정도면 충분해'라는 말을 안 해본 사람! 진정한 플렉서! 🏦",
                "🍾 클럽 VIP, 호텔 스위트룸, 프라이빗 제트... 어디까지 가봤니? 🛩️",
                "🎩 '돈이 아니라 시간이 문제야'라는 말이 현실이 되는 순간! ⏳"
            ]
        }


        lst = list(income_positions.keys())

        def get_income_message(income):
            messages = income_positions.get(income, ["😶 해당하는 메시지가 없네...!"])
            return random.choice(messages)

        
        
        # JSON 데이터를 DataFrame으로 변환
        df = pd.DataFrame(data)
        
        # 필요한 컬럼 선택 및 정렬
        df = df[["C2_NM", "C1_NM","DT"]]
        df.columns = ["연령대", "소득", "백분위"]

        # 소득 기준으로 정렬 (오름차순)
        df = df.sort_values(by="소득", ascending=True)
        
        # print(df["소득"].unique())  
        # print(df["연령대"].unique())  
        age = input.age
        income = input.income
        cnt = lst.index(income)

        백분위값 = df.loc[(df["연령대"] == age) & (df["소득"] == income), "백분위"].values[0]
        mean = df.loc[(df["연령대"] == age) & (df["소득"] == "중위소득"), "백분위"].values[0]
        avg = df.loc[(df["연령대"] == age) & (df["소득"] == "평균소득"), "백분위"].values[0]
        print(백분위값)
        print(mean)
        print(avg)

        print("cnt",cnt)

        sum = 0
        for i in range(cnt, -1, -1):  # cnt부터 0까지 감소 (step=-1)
            unit = df.loc[(df["연령대"] == age) & (df["소득"] == lst[i]), "백분위"].values[0]
            print("unit",unit)
            sum = sum + float(unit)

        # if sum>50 :
        #     sum = 100 - sum
        #     print("상위",sum ,"%")
        # else:
        #     print("하위",sum ,"%")
        print(sum)
        # 응답 메시지 구성  여기 상위 바꿔야함
        message = get_income_message(income)
        # JSON 형식으로 응답 반환
        return {
            "message": message,
            "status": "success",
            "data": {
                "percentile": 백분위값,
                "mean": round(float(mean), 1),
                "average": round(float(avg), 1),
                "position": "상위" if sum > 50 else "하위",
                "percentage": round(100 - float(sum), 1) if sum > 50 else round(float(sum), 1)
            }
        }
    else:
        # 에러 발생 시 에러 메시지 반환
        return {
            "message": f"데이터를 가져오는데 실패했습니다. (에러코드: {response.status_code})",
            "status": "error"
        }






'''
['1000만원 이상' '150～250만원 미만' '250～350만원 미만' '350～450만원 미만' '450～550만원 미만'
 '550～650만원 미만' '650～800만원 미만' '800～1000만원 미만' '85만원 미만' '85～150만원 미만'
 '중위소득' '총 계' '평균소득']
['50~54세' '55~59세' '총 계' '19세 이하' '60~64세' '20~29세' '20~24세' '30~39세'
 '65세 이상' '40~49세' '30~34세' '50~59세' '35~39세' '60세 이상' '40~44세' '25~29세'
 '45~49세']
'''
