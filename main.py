import requests
import pandas as pd
import random




def fetch_kosis_data():
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
                "🫥 사회의 숨은 고수... 아니, 생존 마스터! 💰 아낌의 달인!",
                "🍞 알뜰함의 끝판왕! 혹시 쿠폰북 들고 다니시나요? 📖",
                "💡 알바 월급이 생활비... 하지만 꿈과 희망은 가득! 🌈"
            ],
            "85～150만원 미만": [
                "🍜 편의점 VIP 고객! 라면 신상 나오면 제일 먼저 알지? 🤣",
                "🚲 출퇴근은 따릉이! 지하철 기본요금도 부담되는 그 느낌... 😵",
                "🫠 배달앱 장바구니에 담고 결제는 취소... 오늘도 직접 해먹는다! 🍳"
            ],
            "150～250만원 미만": [
                "📉 텅장과의 싸움! 매달 25일이 ‘Doomsday’ 😵",
                "☕ 카페 갈 때, ‘아메리카노만 마실게요’가 입버릇! 💸",
                "📊 월급 루팡 중? 현실은 생활비로 증발 중... 💀"
            ],
            "250～350만원 미만": [
                "📈 이제 막 중산층 입성 준비! 한 걸음씩 위로 가보자고! 🔥",
                "🚆 '대중교통 정기권'이 제일 효율적인 소비라고 믿는 당신! 🎟️",
                "🥑 건강 챙길 여유는 생겼지만, 아보카도는 아직 사치?! 🤔"
            ],
            "350～450만원 미만": [
                "💼 직장인 루키! 월급날 저가 커피샵 말고, 스타벅스 가는 여유? ☕",
                "🍖 가끔 삼겹살 3인분 혼자 먹어도 지갑이 안 아픈 단계! 🥩",
                "🚕 지하철 끊기면 택시 탈까 말까 심각한 고민 시작! 🤯"
            ],
            "450～550만원 미만": [
                "💳 소소한 플렉스 가능! 친구들 사이에서 ‘한 턱 쏴!’ 듣는 수준! 🍖",
                "🏨 가끔 호캉스도 가는 직장인, ‘일상이 여행’이 목표! ✈️",
                "📱 신형 아이폰 나오면 살까 말까 진지하게 고민하는 단계! 🍏"
            ],
            "550～650만원 미만": [
                "🚗 출퇴근 지하철? 이제 슬슬 내 차 뽑을 고민하는 단계! 🏎️",
                "💸 2차까지는 걱정 없이 쏠 수 있는 당신, 리스펙! 🙌",
                "🏠 원룸 탈출 D-100?! 내 집 마련을 꿈꾸는 현실적인 자산가! 🔑"
            ],
            "650～800만원 미만": [
                "🏠 ‘부동산 어플’ 자주 켜고 있는 당신! 내 집 마련이 눈앞? 👀",
                "🍷 소주 대신 와인으로 갈아탄 당신, 이젠 분위기를 즐긴다! 🎶",
                "💼 '일보다 돈이 많아야 한다'는 철학을 가지기 시작하는 단계! 📊"
            ],
            "800～1000만원 미만": [
                "🤑 좀 치는 사람! 혹시 주변에서 '투자 좀 가르쳐줘' 소리 듣지? 🤩",
                "💎 명품 쇼핑할 때 가격을 먼저 안 보게 되는 단계?! 👔",
                "✈️ 이제는 비즈니스석 한 번 타볼까? 승급 고민 시작! 💺"
            ],
            "1000만원 이상": [
                "🚀 대한민국 상위 1% 클럽 가입 완료! 혹시 재벌 3세세요? 👑",
                "🏝️ 월급이 아니라 자산이 돈을 버는 단계... 혹시 FIRE족? 🔥",
                "💰 ‘이 정도면 충분해’라는 말을 안 해본 사람! 진정한 플렉서! 🏦"
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
        age = "55~59세"
        income = "550～650만원 미만"
        
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

        if sum>50 :
            sum = 100 - sum
            print("상위",sum ,"%")
        else:
            print("하위",sum ,"%")

        print(get_income_message(income))
        


    else:
        print(f"Error: {response.status_code}")

if __name__ == "__main__":
    fetch_kosis_data()
