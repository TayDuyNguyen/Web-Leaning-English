export const tensesData = {
  "tenses": [
    {
      "id": 1,
      "name": "Thì hiện tại đơn",
      "usage": "- diễn tả hành động thường xuyên xảy ra.\n- diễn tả thói quen.\n- diễn tả thời gian biểu, lịch trình, thông báo.\n- diễn tả sự thật, chân lí.\n- diễn tả nghề nghiệp, sở thích, nguồn gốc, bình phẩm.",
      "formula": {
        "has_be": true,
        "ordinary": {
          "affirmative": "S + V(s/es) + O",
          "negative": "S + do / does + not + V(bare) + O",
          "interrogative": "Do / Does + S + V(bare) + O?"
        },
        "be": {
          "affirmative": "S + am / is / are + Noun/Adj",
          "negative": "S + am / is / are + not + Noun/Adj",
          "interrogative": "Am / Is / Are + S + Noun/Adj?"
        },
        "notes": [
          "Chủ ngữ số ít (He, She, It, Danh từ số ít) đi với V(s/es), 'is', hoặc trợ động từ 'does'.",
          "Chủ ngữ số nhiều (We, You, They, Danh từ số nhiều) đi với V(bare), 'are', hoặc trợ động từ 'do'.",
          "Chủ ngữ 'I' đi với V(bare), 'am', hoặc trợ động từ 'do'.",
          "Khi đã mượn trợ động từ do/does, động từ chính luôn ở dạng nguyên mẫu V(bare)."
        ]
      },
      "signals": "- seldom/ rarely/ hardly\n- sometimes/ occasionally\n- often/ usually/ frequently\n- always/ constantly\n- ever\n- never\n- every"
    },
    {
      "id": 2,
      "name": "Thì quá khứ đơn",
      "usage": "- diễn tả hành động đã xảy ra và đã chấm dứt trong quá khứ, không còn liên quan tới hiện tại.\n- diễn tả hành động xảy ra nối tiếp nhau trong quá khứ.\n- diễn tả hồi ức, kỉ niệm.",
      "formula": {
        "has_be": true,
        "ordinary": {
          "affirmative": "S + V2/ed + O",
          "negative": "S + did + not + V(bare) + O",
          "interrogative": "Did + S + V(bare) + O?"
        },
        "be": {
          "affirmative": "S + was / were + Noun/Adj",
          "negative": "S + was / were + not + Noun/Adj",
          "interrogative": "Was / Were + S + Noun/Adj?"
        },
        "notes": [
          "Chủ ngữ số ít & I (I, He, She, It, Danh từ số ít) đi với 'was'.",
          "Chủ ngữ số nhiều (We, You, They, Danh từ số nhiều) đi với 'were'.",
          "Trợ động từ 'did' dùng chung cho tất cả các chủ ngữ ở thể phủ định và nghi vấn.",
          "Khi đã dùng trợ động từ did, động từ chính quay về dạng nguyên mẫu V(bare)."
        ]
      },
      "signals": "- ago\n- last\n- yesterday\n- in + một mốc thời gian trong quá khứ (in 2000...)"
    },
    {
      "id": 3,
      "name": "Thì tương tai đơn",
      "usage": "- diễn tả những hành động sẽ xảy ra trong tương lai.\n- diễn tả những dự đoán.\n- diễn tả lời hứa.",
      "formula": {
        "has_be": false,
        "ordinary": {
          "affirmative": "S + will + V(bare) + O",
          "negative": "S + will + not (won't) + V(bare) + O",
          "interrogative": "Will + S + V(bare) + O?"
        },
        "notes": [
          "Dùng trợ động từ 'will' (hoặc viết tắt 'll') cho tất cả các chủ ngữ.",
          "Dạng phủ định viết tắt của 'will not' là 'won't'.",
          "Động từ đi sau will/won't luôn ở dạng nguyên mẫu không 'to' V(bare)."
        ]
      },
      "signals": "- tomorrow\n- next\n- soon\n- in + một khoảng thời gian (in an hour...)"
    },
    {
      "id": 4,
      "name": "Thì hiện tại tiếp diễn",
      "usage": "- diễn tả hành động đang xảy ra tại thời điểm nói.\n- diễn tả hành động sẽ xảy ra trong tương lai (có kế hoạch từ trước).\n- diễn tả sự thay đổi của thói quen.\n- diễn ta sự ca thán, phàn nàn.",
      "formula": {
        "has_be": false,
        "ordinary": {
          "affirmative": "S + am / is / are + V-ing + O",
          "negative": "S + am / is / are + not + V-ing + O",
          "interrogative": "Am / Is / Are + S + V-ing + O?"
        },
        "notes": [
          "I + am + V-ing.",
          "He, She, It, Danh từ số ít + is + V-ing.",
          "We, You, They, Danh từ số nhiều + are + V-ing."
        ]
      },
      "signals": "- now\n- at the moment\n- at present\n- right now\n- look /hear (!)"
    },
    {
      "id": 5,
      "name": "Thì quá khứ tiếp diễn",
      "usage": "- diễn tả hành động đang xảy ra tại một thời điểm xác định trong quá khứ.\n- diễn tả hành động đang xảy ra thì có hành động khác xen vào, hành động nào xảy ra trước chia thì quá khử tiếp diễn, hành động nào xảy ra sau chia thì quá khứ đơn.",
      "formula": {
        "has_be": false,
        "ordinary": {
          "affirmative": "S + was / were + V-ing + O",
          "negative": "S + was / were + not + V-ing + O",
          "interrogative": "Was / Were + S + V-ing + O?"
        },
        "notes": [
          "I, He, She, It, Danh từ số ít + was + V-ing.",
          "We, You, They, Danh từ số nhiều + were + V-ing."
        ]
      },
      "signals": "- giờ + trạng từ quá khứ (at 3 pm yesterday...)\n- at this/that time + trạng từ quá khứ ( at this time last week....)"
    },
    {
      "id": 6,
      "name": "Thì tương tai tiếp diễn",
      "usage": "- diễn tả hành động đang diễn ra vào một thời điểm cụ thể trong tương lai.\n- diễn tả hành động sẽ đang xảy ra trong tương lai thì có hành động khác xen vào, hành động nào xảy ra trước chia thì tương lai tiếp diễn, hành động nào xảy ra sau chia thì hiện tại đơn.",
      "formula": {
        "has_be": false,
        "ordinary": {
          "affirmative": "S + will be + V-ing + O",
          "negative": "S + will + not + be + V-ing + O",
          "interrogative": "Will + S + be + V-ing + O?"
        },
        "notes": [
          "Dùng cụm trợ động từ 'will be' cho tất cả các chủ ngữ.",
          "Ở thể phủ định, từ 'not' đứng giữa 'will' và 'be' (will not be / won't be)."
        ]
      },
      "signals": "- giờ + trạng từ tương lai (at 3 pm tomorrow...)\n- at this/that time + trạng từ tương lai\n(at this time next week....)"
    },
    {
      "id": 7,
      "name": "Thì hiện tại hoàn thành",
      "usage": "- diễn tả hành động xảy ra trong quá khứ nhưng không rõ thời gian.\n- diễn tả hành động lặp đi lặp lại nhiều lần trong quá khứ.\n- diễn tả hành động xảy ra trong quá khứ nhưng để lại dấu hiệu hoặc hậu quả ở hiện tại.\n- diễn tả những trải nghiệm.\n- diễn tả những hành động xảy ra trong quá khứ nhưng kéo dài tới hiện tại và vẫn còn có khả năng sẽ tiếp diễn trong tương lai.",
      "formula": {
        "has_be": false,
        "ordinary": {
          "affirmative": "S + have / has + V3/ed + O",
          "negative": "S + have / has + not + V3/ed + O",
          "interrogative": "Have / Has + S + V3/ed + O?"
        },
        "notes": [
          "Chủ ngữ số ít (He, She, It, Danh từ số ít) đi với 'has'.",
          "Chủ ngữ số nhiều & I (I, We, You, They, Danh từ số nhiều) đi với 'have'.",
          "V3/ed là động từ thêm đuôi '-ed' (đối với động từ có quy tắc) hoặc động từ ở cột thứ 3 trong bảng động từ bất quy tắc."
        ]
      },
      "signals": "- for\n- since\n- ever\n- never\n- so far\n- recently\n- lately\n- before (đứng cuối câu)\n- up to now/ up to present/ until now\n- yet\n- just\n- already"
    },
    {
      "id": 8,
      "name": "Thì quá khứ hoàn thành",
      "usage": "- diễn tả những hành động xảy ra và hoàn thành trước hành động khác trong quá khứ.",
      "formula": {
        "has_be": false,
        "ordinary": {
          "affirmative": "S + had + V3/ed + O",
          "negative": "S + had + not + V3/ed + O",
          "interrogative": "Had + S + V3/ed + O?"
        },
        "notes": [
          "Trợ động từ 'had' dùng cho tất cả các chủ ngữ.",
          "Ở thể phủ định có thể viết tắt thành 'hadn't'."
        ]
      },
      "signals": "- before/by the time (trước chia quá khứ hoàn thành, sau chia quá khứ đơn).\n- after (trước chia quá khứ đơn, sau chia quá khứ hoàn thành).\n\u0011"
    },
    {
      "id": 9,
      "name": "Thì tương lai hoàn thành",
      "usage": "- diễn tả hành động sẽ được hoàn thành trước khi một hành động khác xảy đến.",
      "formula": {
        "has_be": false,
        "ordinary": {
          "affirmative": "S + will have + V3/ed + O",
          "negative": "S + will + not + have + V3/ed + O",
          "interrogative": "Will + S + have + V3/ed + O?"
        },
        "notes": [
          "Dùng cụm trợ động từ 'will have' cho tất cả các chủ ngữ (không chia has).",
          "Ở thể phủ định, từ 'not' đứng giữa 'will' và 'have' (will not have / won't have)."
        ]
      },
      "signals": ""
    },
    {
      "id": 10,
      "name": "Thì hiện tại hoàn thành tiếp diễn",
      "usage": "- nhấn mạnh khoảng thời gian của một hành động đã xảy ra trong quá khứ và tiếp tục tới hiện tại (có thể tiếp diễn trong tương lai).",
      "formula": {
        "has_be": false,
        "ordinary": {
          "affirmative": "S + have / has + been + V-ing + O",
          "negative": "S + have / has + not + been + V-ing + O",
          "interrogative": "Have / Has + S + been + V-ing + O?"
        },
        "notes": [
          "Chủ ngữ số ít (He, She, It, Danh từ số ít) đi với 'has been'.",
          "Chủ ngữ số nhiều & I (I, We, You, They, Danh từ số nhiều) đi với 'have been'.",
          "Sử dụng khi muốn nhấn mạnh sự liên tục, kéo dài của hành động."
        ]
      },
      "signals": "- all day/week....\n- almost every day this week...\n- in the past year..."
    },
    {
      "id": 11,
      "name": "Thì quá khứ hoàn thành tiếp diễn",
      "usage": "nhấn mạnh khoảng thời gian của một hành động đã xảy ra trong quá khử và kết thúc trước một hành động quá khứ khác.",
      "formula": {
        "has_be": false,
        "ordinary": {
          "affirmative": "S + had been + V-ing + O",
          "negative": "S + had + not + been + V-ing + O",
          "interrogative": "Had + S + been + V-ing + O?"
        },
        "notes": [
          "Sử dụng cụm trợ động từ 'had been' cho tất cả các chủ ngữ.",
          "Ở dạng phủ định viết tắt thành 'hadn't been'."
        ]
      },
      "signals": "- until then\n- prior to that time"
    },
    {
      "id": 12,
      "name": "Thì tương lai hoàn thành tiếp diễn",
      "usage": "nhấn mạnh khoảng thời gian của một hành động sẽ đang xảy ra trong tương lai và kết thúc trước một hành động tương lai khác.",
      "formula": {
        "has_be": false,
        "ordinary": {
          "affirmative": "S + will have been + V-ing + O",
          "negative": "S + will + not + have been + V-ing + O",
          "interrogative": "Will + S + have been + V-ing + O?"
        },
        "notes": [
          "Sử dụng cụm trợ động từ 'will have been' cho tất cả các chủ ngữ.",
          "Dạng phủ định viết tắt là 'won't have been'."
        ]
      },
      "signals": ""
    }
  ],
  "exercises": [
    {
      "name": "Exercise 1",
      "description": "Complete the following sentences using the forms of present simple tense of verbs in brackets.",
      "questions": [
        {
          "num": 1,
          "type": "fill",
          "text": "The earth_goes__?__(go) around the sun.",
          "answer": "goes",
          "explanation": "Dịch: Trái đất quay quanh mặt trời. => Đây là sự thật hiển nhiên luôn đúng => chia thì hiện tại đơn."
        },
        {
          "num": 2,
          "type": "choice",
          "text": "Angela usually_____(leave) for work at 8:00",
          "options": {
            "A": "M."
          },
          "answer": "leaves",
          "explanation": "Căn cứ vào trạng từ “usually” thì động từ trong câu phải chia thì hiện tại đơn."
        },
        {
          "num": 3,
          "type": "fill",
          "text": "Liz_____(get up) at 6 o’clock every morning.",
          "answer": "gets up",
          "explanation": "Căn cứ vào: \"every morning\" là dấu hiệu nhận biết thì hiện tại đơn."
        },
        {
          "num": 4,
          "type": "fill",
          "text": "In the summer, John often_____(play) tennis once or twice a week.",
          "answer": "plays",
          "explanation": "Căn cứ vào trạng từ “often” thì động từ trong câu phải chia thì hiện tại đơn."
        },
        {
          "num": 5,
          "type": "fill",
          "text": "What time you usually_____(get) home after work?",
          "answer": "do you usually get",
          "explanation": "Căn cứ vào trạng từ “usually” thì động từ trong câu phải chia thì hiện tại đơn. Đây là câu hỏi nên đảo trợ động từ lên trước chủ ngữ."
        },
        {
          "num": 6,
          "type": "fill",
          "text": "The swimming pool_____(open) at 9:00 and_____(close) at 6:30 every day.",
          "answer": "opens / closes",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại đơn: “nói về lịch trình hoặc thời gian biểu” thì động từ trong câu phải chia thì hiện tại đơn. => Hai động từ cùng có chung chủ ngữ là “the swimming pool” - danh từ số ít nên động từ cần chia số ít. – Dịch: Hàng ngày, bể bơi mở cửa lúc 9 giờ sáng và đóng cửa lúc 6 giờ 30 chiều."
        },
        {
          "num": 7,
          "type": "fill",
          "text": "Every year I_____(visit) Britain to improve my English.",
          "answer": "visit",
          "explanation": "Căn cứ vào từ \"every year\" là dấu hiệu nhận biết thì hiện tại đơn. Chủ ngữ “I”- danh từ ngôi thứ nhất => động từ chia số nhiều"
        },
        {
          "num": 8,
          "type": "fill",
          "text": "In the United State, elementary education is compulsory. All children _____ (study) six years of elementary school.",
          "answer": "study",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại đơn: diễn tả những điều luôn đúng thì động từ trong câu phải chia thì hiện tại đơn. – Dịch: Ở Mỹ, giáo dục cơ bản là bắt buộc. Tất cả trẻ em phải học sáu năm học ở trường học sơ cấp."
        },
        {
          "num": 9,
          "type": "fill",
          "text": "I_____(not like) feel going to the library to study this afternoon.",
          "answer": "don’t feel like",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại đơn: diển tả quan điểm, cảm giác hay suy nghĩ của người nói."
        },
        {
          "num": 10,
          "type": "fill",
          "text": "American people usually_____(have) their biggest meal in the evening.",
          "answer": "have",
          "explanation": "Căn cứ vào trạng từ “usually” thì động từ trong câu phải chia thì hiện tại đơn."
        },
        {
          "num": 11,
          "type": "fill",
          "text": "- Can you tell me when the train for HCM city_____(leave)? - In fifteen minutes. At 7.05.",
          "answer": "leaves",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại đơn: “nói về lịch trình hoặc thời gian biểu” thì động từ trong câu phải chia thì hiện tại đơn."
        },
        {
          "num": 12,
          "type": "fill",
          "text": "Of course, you are Lisa, aren’t you? I_____(recognize) you now.",
          "answer": "recognize",
          "explanation": "Tạm dịch: Dĩ nhiên, bạn là Lisa phải không? Bây giờ tôi nhận ra bạn rồi. Căn cứ vào trạng từ \" now\" => chia thì hiện tại tiếp diễn. Tuy nhiên, động từ “recognize” không chia thì tiếp diễn nên ta chọn chia ở thì hiện tại đơn."
        },
        {
          "num": 13,
          "type": "fill",
          "text": "I can see from what you say that your mornings are very busy! But what you (do)_____in the afternoons?",
          "answer": "do you do",
          "explanation": "Căn cứ vào ngữ cảnh của câu thì động từ trong câu phải chia thì hiện tại đơn. Chú ý: Đây là câu hỏi nên đảo trợ động từ lên trước chủ ngữ."
        },
        {
          "num": 14,
          "type": "fill",
          "text": "Before our director_____(come back), I_____(want) to remind everyone that we should not use the internet on personal purposes.",
          "answer": "comes back",
          "explanation": "Căn cứ vào cách hợp thì với mệnh đề trạng ngữ chỉ thời gian: “Trong mệnh đề trạng ngữ chỉ thời gian ta dùng thì hiện tại đơn cho dù muốn diễn đạt hành động chưa xảy ra”. Trong ngữ cảnh trên, ông giám đốc chưa quay trở lại, nhưng vì mệnh đề này là mệnh đề trạng ngữ chỉ thời gian nên ta không dùng thì tương lai."
        },
        {
          "num": 15,
          "type": "fill",
          "text": "- Are you writing to him now? - Yes, I always_____(write) to him on his birthday. You_____ (want) to send any message? - Certainly.",
          "answer": "write; Do",
          "explanation": "Căn cứ vào trạng từ “always” thì động từ trong câu phải chia thì hiện tại đơn. Tuy nhiên trạng từ “always” có thể dùng với thì hiện tại tiếp diễn để nói về sự phàn nàn. Nhưng trong trường hợp này “always” đi với thì hiện tại đơn để diễn đạt sự “thường xuyên lặp đi lặp lại”. Chú ý: Vế hai là câu hỏi nên đảo trợ động từ lên trước chủ ngữ. Động từ “want” không chia thể tiếp diễn nên ta chia thì hiện tại đơn. - \"Bây giờ bạn đang viết thư cho anh ấy phải không?\" - \" Đúng vậy, tôi luôn luôn viết cho anh ấy vào ngày sinh nhật. Bạn muốn gửi lời nhắn nào không?\" - “Chắc chắn rồi.”"
        }
      ]
    },
    {
      "name": "Exercise 2",
      "description": "Complete the following sentences using the forms of the present continuous tense of verbs in brackets.",
      "questions": [
        {
          "num": 1,
          "type": "fill",
          "text": "It_____(rain) heavily now.",
          "answer": "is raining",
          "explanation": "* Căn cứ vào trạng từ “now” là dấu hiệu nhận biết thì hiện tại tiếp diễn."
        },
        {
          "num": 2,
          "type": "fill",
          "text": "My brother_____(get) married next week.",
          "answer": "is getting",
          "explanation": "* Căn cứ vào cách dùng của thì hiện tại tiếp diễn: diễn tả hành động sẽ xảy ra trong tương lai (có kế hoạch từ trước). * Dịch nghĩa: Anh trai của tôi sẽ kết hôn vào tuần tới. - Vì việc kết hôn có kế hoạch từ trước => chia thì hiện tại tiếp diễn mang ý chỉ tương lai."
        },
        {
          "num": 3,
          "type": "fill",
          "text": "He is late again. He always_____(come) to class late.",
          "answer": "is always coming",
          "explanation": "* Căn cứ vào cách dùng của thì hiện tiếp diễn với trạng từ “always” nói về sự phàn nàn, ca thán về một thói quen trong hiện tại, ta dùng “be always Ving” * Dịch nghĩa: Anh ấy lại đến muộn. Anh ấy luôn luôn đến lớp muộn. => Vì vế trước có chứa “again”, nó đã thể hiện sự khó chịu của người nói, nên vế sau chỉ có thể diễn đạt theo dạng tiếp diễn mới có thể biểu đạt được ý phàn nàn này. Không thể dùng hiện tại đơn như một thói quen thông thường được."
        },
        {
          "num": 4,
          "type": "fill",
          "text": "She_____(take) the exam tomorrow.",
          "answer": "is taking",
          "explanation": "Căn cứ vào cách dùng của thì hiện tiếp diễn: nói về một kế hoạch cho tương lai đã có sự sắp xếp. Dịch: Cô ấy sẽ thi vào ngày mai."
        },
        {
          "num": 5,
          "type": "fill",
          "text": "Look! It_____(get) dark. Hurry up! It_____(rain) in a few minutes.",
          "answer": "is raining",
          "explanation": "Căn cứ vào động từ: Look! (nhìn kìa), Hurry up! (nhanh lên) - là dấu hiệu của thì hiện tại tiếp diễn. Lưu ý: Động từ “get” kết thúc bằng một phụ âm, đi trước là một nguyên âm nên ta gấp đôi phụ âm trước khi thêm -ing."
        },
        {
          "num": 6,
          "type": "fill",
          "text": "Please don’t make so much noise. I_____(work).",
          "answer": "am working",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại tiếp diễn: nói về hành động xảy ra ngay tại thời điểm nói."
        },
        {
          "num": 7,
          "type": "fill",
          "text": "I_____(read) an interesting book at the moment. I will lend it to you when I’ve finished it.",
          "answer": "am reading",
          "explanation": "Căn cứ vào “at the moment” là dấu hiệu của thì hiện tại tiếp diễn."
        },
        {
          "num": 8,
          "type": "fill",
          "text": "Sarah_____(work) this week? - No, she is on vacation.",
          "answer": "Is Sarah working",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại tiếp diễn: nói về một sự việc xảy ra trong một khoảng thời gian gần với lúc nói, ví dụ như: today, this week. Chú ý: Đây là câu hỏi nên đảo trợ động từ lên trước chủ ngữ. - Tuần này Sarah có làm việc không? - Không, cô ấy đang có kỳ nghỉ."
        },
        {
          "num": 9,
          "type": "fill",
          "text": "The population of the world_____(rise) very fast.",
          "answer": "is rising",
          "explanation": "* Căn cứ vào cách dùng của thì hiện tại tiếp diễn: nói về những sự thay đổi đang diễn ra trong thời điểm nói. * Dịch: Dân số của thế giới đang tăng rất nhanh."
        },
        {
          "num": 10,
          "type": "fill",
          "text": "I_____(work) on the project of reconstructing city at present.",
          "answer": "am working",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại tiếp diễn: nói về sự việc xảy ra tại một thời điểm tương đối trong hiện tại (không nhất thiết đang xảy ra tại thời điểm nói)."
        },
        {
          "num": 11,
          "type": "fill",
          "text": "She is on vacation in France. She_____(have) a great time and doesn’t want to come back.",
          "answer": "is having",
          "explanation": "* Căn cứ vào cách dùng của thì hiện tại tiếp diễn: nói về hành động xảy ra ngay tại thời điểm nói. * Dịch: Cô ấy đang đi nghỉ ở Pháp. Cô ấy đang có thời gian tuyệt vời và không muốn về."
        },
        {
          "num": 12,
          "type": "fill",
          "text": "Tom_____(look) for Ann. Do you know where she is?",
          "answer": "is looking",
          "explanation": "* Dịch nghĩa: Tom đang tìm Ann. Bạn biết cô ấy ở đâu không? => Hành động xảy ra ngay tại thời điểm nói. Thực tế Tom đang tìm Ann => chia thì hiện tại tiếp diễn."
        },
        {
          "num": 13,
          "type": "fill",
          "text": "I_____(think) of my mother, who has devoted her whole life to our family.",
          "answer": "am thinking",
          "explanation": "Căn cứ vào động từ “think” – khi mô tả hành động thì “think” được coi là một động từ động, vẫn có thể đi với thể tiếp diễn."
        },
        {
          "num": 14,
          "type": "fill",
          "text": "It is time we turned on the central heating. It_____(get) colder every day.",
          "answer": "is getting",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại tiếp diễn: nói về những sự thay đổi đang diễn ra trong thời điểm nói. - Vì “every day” cho thấy sự biến đổi đang diễn ra từng ngày theo thời gian chứ không phải là một dự định hay hiện tượng sẽ xảy ra trong tương lai gần nên không thể dùng “be going to Vo”; và đồng thời dù “every day” là dấu hiệu phổ biến trong thì hiện tại đơn nhưng trong ngữ cảnh này nó không được dùng như thế vì đó không phải là hành động lặp đi lặp lại như một thói quen"
        },
        {
          "num": 15,
          "type": "fill",
          "text": "-I_____(go) out to get an evening paper. - But it_____(rain). - Why don’t you wait till the rain stops?",
          "answer": "is raining",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại tiếp diễn: nói về hành động xảy ra ngay tại thời điểm nói."
        }
      ]
    },
    {
      "name": "Exercise 3",
      "description": "Complete the following sentences using the present perfect forms of the verbs in brackets.",
      "questions": [
        {
          "num": 1,
          "type": "fill",
          "text": "She_____(learn) English for three years.",
          "answer": "has learnt",
          "explanation": "Dịch: Cô ấy đã học tiếng Anh trong vòng 3 năm. Lưu ý: Câu này cũng có thể chia thì hiện tại hoàn thành tiếp diễn khi nhấn mạnh tính liên tục của hành động."
        },
        {
          "num": 2,
          "type": "fill",
          "text": "I’m hungry. I_____(not eat) anything since breakfast.",
          "answer": "haven’t eaten",
          "explanation": ""
        },
        {
          "num": 3,
          "type": "fill",
          "text": "He never_____(drive) a car before.",
          "answer": "has never driven",
          "explanation": "Dịch: Anh ấy chưa bao giờ lái xe trước đây."
        },
        {
          "num": 4,
          "type": "fill",
          "text": "We_____(know) each other since we were at high school.",
          "answer": "have known",
          "explanation": "Dịch: Chúng tôi đã biết nhau từ khi chúng tôi ở trường cấp ba."
        },
        {
          "num": 5,
          "type": "fill",
          "text": "Everything is going well. We_____(not have) any problem so far.",
          "answer": "haven’t had",
          "explanation": "Dịch: Mọi thứ đang trở nên tốt hơn. Cho đến nay chúng tôi chưa có bất cứ vấn đề nào."
        },
        {
          "num": 6,
          "type": "fill",
          "text": "I_____(drink) four cups of coffee today.",
          "answer": "have drunk",
          "explanation": "Dịch: Tôi đã uống 4 cốc cà phê hôm nay."
        },
        {
          "num": 7,
          "type": "fill",
          "text": "John_____(live) in Denver since 2017.",
          "answer": "has lived",
          "explanation": "Dịch: John đã sống ở Denver từ năm 2017."
        },
        {
          "num": 8,
          "type": "fill",
          "text": "- You ever_____(climb) Mount Everest? - No, I haven’t. But I’m sure I will, if I have a chance.",
          "answer": "have you ever climbed",
          "explanation": "Dịch: - Bạn đã leo núi Everest chưa? - Không, tôi chưa. Nhưng tôi chắc chắn tôi sẽ làm, nếu tôi có cơ hội."
        },
        {
          "num": 9,
          "type": "fill",
          "text": "It is nice to see you again. We_____(not see) each other for a long time.",
          "answer": "haven’t seen / haven’t been seeing",
          "explanation": "Dịch: Thật tốt để gặp lại bạn một lần nữa. Chúng ta chưa gặp nhau trong một thời gian dài."
        },
        {
          "num": 10,
          "type": "fill",
          "text": "I_____(forget) my key. I can’t unlock the door now.",
          "answer": "have forgotten",
          "explanation": "Dịch: Tôi đã lám mất chìa khóa của mình. Bây giờ tôi không thể mở cửa."
        },
        {
          "num": 11,
          "type": "fill",
          "text": "Eric is calling his girlfriend again. That is the third time he_____(call) her this evening.",
          "answer": "has called",
          "explanation": "Dịch: Eric lại đang gọi cho bạn gái của anh ấy. Đây là lần thứ ba anh ấy gọi cho cô ấy trong tối nay."
        },
        {
          "num": 12,
          "type": "fill",
          "text": "The police_____(arrest) two men in connection with the robbery.",
          "answer": "have arrested",
          "explanation": "Dịch: Cảnh sát đã bắt 2 người liên quan đến vụ cướp."
        },
        {
          "num": 13,
          "type": "fill",
          "text": "Susan really loves that film. She_____(see) it eight times!",
          "answer": "has seen",
          "explanation": "Dịch: Susan thực sự thích bộ phim đó. Cô ấy đã xem nó 8 lần!"
        },
        {
          "num": 14,
          "type": "fill",
          "text": "You already_____(read) the book? What do you think?",
          "answer": "have you already read",
          "explanation": "Dịch: Bạn đã đọc cuốn sách rồi phải không? Bạn nghĩ gì?"
        },
        {
          "num": 15,
          "type": "fill",
          "text": "I_____(not go) to a zoo before. It is a nice feeling to go somewhere you never_____(be) before.",
          "answer": "haven’t gone; have never been",
          "explanation": "Dịch: Tôi chưa từng đi đến vườn bách thú trước đây. Đó là cảm giác tuyệt vời để đi đến nơi nào đó bạn chưa từng đến từ trước."
        }
      ]
    },
    {
      "name": "Exercise 4",
      "description": "Complete the following sentences using the present perfect continuous forms of the verbs in brackets.",
      "questions": [
        {
          "num": 1,
          "type": "fill",
          "text": "He_____(wait) all the morning.",
          "answer": "has been waiting",
          "explanation": "* Dịch nghĩa: Anh ấy đã chờ cả buổi sáng. * Căn cứ: - “all the morning”: nhấn mạnh tính liên tục của hành động “chờ”. => chia thì hiện tại hoàn thành tiếp diễn."
        },
        {
          "num": 2,
          "type": "fill",
          "text": "Richard_____(do) the same job for 20 years.",
          "answer": "has been doing",
          "explanation": "* Dịch nghĩa: Richard đã làm công việc giống nhau trong vòng 20 năm. * Căn cứ: - “for 20 years” nhấn mạnh tính liên tục đã “làm trong vòng 20 năm”. => chia thì hiện tại hoàn thành tiếp diễn."
        },
        {
          "num": 3,
          "type": "fill",
          "text": "I_____(study) English for six months.",
          "answer": "have been studying",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại hoàn thành tiếp diễn: nhấn mạnh tính liên tục của hành động."
        },
        {
          "num": 4,
          "type": "fill",
          "text": "Mike_____(work) in Las Vegas for the last few months.",
          "answer": "has been working",
          "explanation": "* Dịch nghĩa: Mike đã làm việc ở Vegas trong một vài tháng cuối. * Căn cứ vào: + “for the last few months” nhấn mạnh đến khoảng thời gian “trong một vài tháng cuối”.=> nhấn mạnh tính liên tục của hành động."
        },
        {
          "num": 5,
          "type": "fill",
          "text": "It_____(rain) since lunchtime.",
          "answer": "has been raining / has rained",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại hoàn thành tiếp diễn: nhấn mạnh quá trình hành động đã, đang và sẽ có thể xảy ra liên tục trong một khoảng thời gian nhất định. Có thể dùng cả thì hiện tại hoàn thành, diễn tả hành động kéo dài từ quá khứ đến hiện tại và có thể tiếp tục trong tương lai, mặc dù nó chủ yếu nhấn mạnh đến kết quả để lại. Nhưng với dạng bài tập tự luận thì cả hai đều chấp nhận được."
        },
        {
          "num": 6,
          "type": "fill",
          "text": "Helen_____(read) this book for three days.",
          "answer": "has been reading",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại hoàn thành tiếp diễn: chỉ hành động lặp đi lặp lại trong một khoảng thời gian."
        },
        {
          "num": 7,
          "type": "fill",
          "text": "Kevin_____(look) for a job since he finished school.",
          "answer": "has been looking",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại hoàn thành tiếp diễn: nhấn mạnh hành động đang xảy ra. Để nhấn mạnh quá trình xảy ra của hành động, ta dùng thì hiện tại hoàn thành tiếp diễn sẽ chính xác hơn là thì hiện tại hoàn thành - nhấn mạnh kết quả"
        },
        {
          "num": 8,
          "type": "fill",
          "text": "I’m tired of waiting. I_____(sit) here for one hour.",
          "answer": "have been sitting",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại hoàn thành tiếp diễn: nhấn mạnh tính liên tục của hành động."
        },
        {
          "num": 9,
          "type": "fill",
          "text": "He is exhausted because he_____(work) continuously for more than twelve hours.",
          "answer": "has been working",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại hoàn thành tiếp diễn: chỉ hành động lặp đi lặp lại trong một khoảng thời gian."
        },
        {
          "num": 10,
          "type": "fill",
          "text": "She_____(sleep) for 10 hours! You must wake her.",
          "answer": "has been sleeping",
          "explanation": "Dịch nghĩa: Cô ấy đã ngủ suốt 10 tiếng đồng hồ rồi! Bạn phải đánh thức cô ấy thôi. + “ngủ” là hành động xảy ra trong quá khứ. Vế 2 “Bạn phải đánh thức cô ấy” => có nghĩa cô ấy vẫn chưa dậy. => kéo dài đến hiện tại. + “for 10 hours” => nhấn mạnh tính liên tục của việc “ngủ” của cô ấy kéo dài “trong mười giờ”."
        },
        {
          "num": 11,
          "type": "fill",
          "text": "He_____(read) this book for two hours, but he hasn’t finished it yet.",
          "answer": "has been reading",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại hoàn thành tiếp diễn: nhấn mạnh tính liên tục của hành động."
        },
        {
          "num": 12,
          "type": "fill",
          "text": "That boy_____(wait) for the bus for half an hour. Shall I tell him that the last bus has already gone?",
          "answer": "has been waiting",
          "explanation": "* Căn cứ vào cách dùng của thì hiện tại hoàn thành tiếp diễn: nhấn mạnh tính liên tục của hành động. - \" for half an hour \" nhấn mạnh “thời gian liên tục cậu bé chờ”."
        },
        {
          "num": 13,
          "type": "fill",
          "text": "They_____(argue) very excitedly all this time. Shall I come and interrupt them?",
          "answer": "have been arguing",
          "explanation": "* Dịch nghĩa: Họ đã tranh luận một cách hào hứng mọi lúc. Liệu tôi có thể đến và ngắt lời họ không? * Căn cứ vào: + “all the time” (mọi lúc) nhấn mạnh tính liên tục của hành động. + họ tranh luận mọi lúc. => chia hiện tại hoàn thành tiếp diễn."
        },
        {
          "num": 14,
          "type": "fill",
          "text": "What have you done with my bag? I_____(look) for it for an hour and I haven’t found it yet.",
          "answer": "have been looking",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại hoàn thành tiếp diễn: khi nói về những hành động đã kết thúc gần đây hay mới kết thúc nhưng kết quả còn ảnh hưởng đến hiện tại."
        },
        {
          "num": 15,
          "type": "fill",
          "text": "I_____(think) over what you said since yesterday.",
          "answer": "have been thinking",
          "explanation": "Dịch nghĩa: Tôi đã nghĩ về những điều bạn nói từ ngày hôm qua. + \"đã nghĩ\" là hành động bắt đầu trong quá khứ, kéo dài đến hiện tại và chưa nhắc đến thời điểm kết thúc. => nhấn mạnh tính liên tục của hành động (since yesterday: từ ngày hôm qua)."
        }
      ]
    },
    {
      "name": "Exercise 5",
      "description": "Choose the best word or phrase to complete in the following questions.",
      "questions": [
        {
          "num": 1,
          "type": "choice",
          "text": "We can go out now. It_____anymore.",
          "options": {
            "A": "isn’t raining",
            "B": "rains",
            "C": "has rained",
            "D": "has been raining"
          },
          "answer": "A",
          "explanation": "Căn cứ: cách dùng của thì hiện tại tiếp diễn: Diễn đạt 1 hành động sắp xảy ra trong tương lai gần (thường là chắc chắn)\u000bDịch nghĩa: Chúng ta có thể ra ngoài bây giờ. Trời sẽ không còn mưa nữa."
        },
        {
          "num": 2,
          "type": "choice",
          "text": "What_____in your spare time? Do you have any hobbies?",
          "options": {
            "A": "have you done",
            "B": "are you doing",
            "C": "do you do",
            "D": "have you been doing"
          },
          "answer": "C",
          "explanation": "Căn cứ: cách sử dụng của thì hiện tại đơn: diễn tả một thói quen hay hành động diễn ra thường xuyên, lặp đi lặp lại ở hiện tại. (làm gì trong thời gian rảnh rỗi).\u000b- Dịch nghĩa: Bạn thường làm gì trong thời gian rảnh? Bạn có sở thích gì không?"
        },
        {
          "num": 3,
          "type": "choice",
          "text": "Mary usually_____me on Fridays, but she didn’t call last Friday.",
          "options": {
            "A": "have been calling",
            "B": "calls",
            "C": "is calling",
            "D": "have called"
          },
          "answer": "B",
          "explanation": "Căn cứ: “usually” là dấu hiệu nhận biết thì hiện tại đơn. \nDịch nghĩa: Mary thường gọi cho tôi vào những ngày thứ sáu, nhưng thứ 6 tuần trước lại không thấy cô ấy gọi cho tôi."
        },
        {
          "num": 4,
          "type": "choice",
          "text": "I_____hungry. Let’s have something to eat.",
          "options": {
            "A": "am feeling",
            "B": "have felt",
            "C": "feel",
            "D": "have been feeling"
          },
          "answer": "A",
          "explanation": "Căn cứ vào cách dùng của “feel”: có thể dùng thì “present simple tense” hay “present continuous tense” khi diễn tả cảm giác của người nào đó vào thời điểm nói. \n*Vế sau dùng “let’s” để chỉ hành động rủ nhau cùng đi làm gì ở thời điểm nói, nên có thể hình dung hành động “đang thấy đói” nó cũng đang xảy ra ngay lúc đó luôn, nên chia hiện tại tiếp diễn là phù hợp nhất. Dù có thể suy luận thành thì hiện tại hoàn thành (tiếp diễn), diễn tả hành động kéo dài liên tục từ trong quá khứ đến hiện tại, nhưng vẫn không chính xác vì nó không có dấu hiệu của việc kéo dài này nên không nên suy luận như vậy.\u000b- Dịch nghĩa: Tôi đang cảm thấy đói. Hãy đi ăn gì đi."
        },
        {
          "num": 5,
          "type": "choice",
          "text": "What is that noise? What_____?",
          "options": {
            "A": "have been happening",
            "B": "is happening",
            "C": "have happened",
            "D": "had happened"
          },
          "answer": "B",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại tiếp diễn: diễn tả những hành động xảy ra ngay tại thời điểm nói.\u000b- Dịch nghĩa: Tiếng ồn đó là gì? Điều gì đang xảy ra vậy?"
        },
        {
          "num": 6,
          "type": "choice",
          "text": "It’s usually dry here at this time of the year. It_____much.",
          "options": {
            "A": "isn’t raining",
            "B": "hasn’t rained",
            "C": "hasn’t been raining",
            "D": "doesn’t rain"
          },
          "answer": "D",
          "explanation": "Căn cứ cách dùng của thì hiện tại đơn: diễn tả những sự việc xảy ra thường xuyên.\u000b- Dịch nghĩa: Ở đây trời thường khô vào thời điểm này trong năm. Trời không mưa nhiều.\u000b+ Việc “không mưa” thường xuyên xảy ra => chia thì hiện tại đơn"
        },
        {
          "num": 7,
          "type": "choice",
          "text": "Look! That man over there_____the same sweater as you.",
          "options": {
            "A": "has worn",
            "B": "is wearing",
            "C": "wears",
            "D": "have been wearing"
          },
          "answer": "B",
          "explanation": "* Căn cứ: “Look!” là dấu hiệu nhận biết thì hiện tại tiếp diễn.\n* Chủ ngữ là “That man” => “To be” chia là “is”.\n => Đáp án: is wearing\u000b* Dịch nghĩa: Nhìn kìa! Người đàn ông đó đang mặc áo len dài giống bạn."
        },
        {
          "num": 8,
          "type": "choice",
          "text": "I wonder why Jim_____so nice to me today. He isn’t usually like that.",
          "options": {
            "A": "is being",
            "B": "have been",
            "C": "is",
            "D": "have being"
          },
          "answer": "A",
          "explanation": "* Dịch: Tôi không hiểu tại sao hôm nay anh ấy lại tốt với tôi thế. Bình thường anh ta đâu có như thế. \n* Căn cứ vào:\u000b+ Thì hiện tại đơn: diễn tả thói quen ở hiện tại.\n+ Thì hiện tại tiếp diễn: diễn tả sự thay đổi của thói quen."
        },
        {
          "num": 9,
          "type": "choice",
          "text": "Mary wasn’t happy with her new job at first, but she_____to like it now.",
          "options": {
            "A": "begins",
            "B": "have begun",
            "C": "is beginning",
            "D": "have been beginning"
          },
          "answer": "C",
          "explanation": "Dịch: Đầu tiên Mary không vui vẻ với công việc mới của cô ấy, nhưng bây giờ cô ấy đang dần bắt đầu thích nó.\n=> Căn cứ vào cách dùng của thì hiện tại tiếp diễn “diễn tả sự thay đổi của trạng thái, điều kiện, thói quen”. Trong câu trên “cô ấy bắt đầu thích” => chia thì hiện tại tiếp diễn."
        },
        {
          "num": 10,
          "type": "choice",
          "text": "This is a nice restaurant, isn’t it? Is this the first time you_____here?",
          "options": {
            "A": "are",
            "B": "have been",
            "C": "are being",
            "D": "have being"
          },
          "answer": "B",
          "explanation": "Căn cứ vào cấu trúc: This is the first / second / third … time + S + V (hiện tại hoàn thành).\u000b( Đây là lần đầu tiên/thứ hai/thứ ba… ai đó làm gì)\u000b- Dịch nghĩa: Đây là một nhà hàng ngon phải không? Đây có phải là lần đầu tiên bạn đến đây không?"
        },
        {
          "num": 11,
          "type": "choice",
          "text": "I need a new job. I_____the same job for too long.",
          "options": {
            "A": "are doing",
            "B": "have done",
            "C": "have been doing",
            "D": "do"
          },
          "answer": "C",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại hoàn thành tiếp diễn: diễn tả hành động bắt đầu ở quá khứ và tiếp diễn tới hiện tại (nhấn mạnh tính liên tục).\u000b- Dịch nghĩa: Tôi cần một công việc mới. Tôi đã làm cùng một công việc quá lâu.\u000b+ “đã làm cùng một công việc” là hành động lặp đi lặp lại, kéo dài đến hiện tại. => Chia thì hiện tại hoàn thành tiếp diễn."
        },
        {
          "num": 12,
          "type": "choice",
          "text": "“You look tired”. “Yes, I_____basketball”.",
          "options": {
            "A": "plays",
            "B": "is playing",
            "C": "have played",
            "D": "have been playing"
          },
          "answer": "D",
          "explanation": "Dịch nghĩa: “Em trông có vẻ mệt mỏi” - \" Vâng nãy giờ em đã chơi bóng rổ.\"\n=> Với vế đầu gợi ý về sự mệt mỏi thì vế sau cần phải nhấn mạnh vào quá trình chơi bóng rổ lâu dài trước đó (vì chơi liên tục trong thời gian dài trước đó nên mới mệt), do đó ta dùng thì hiện tại hoàn thành tiếp diễn là phù hợp nhất."
        },
        {
          "num": 13,
          "type": "choice",
          "text": "I would like to see Tina again. It’s been a long time_____.",
          "options": {
            "A": "that I didn’t see her",
            "B": "for I didn’t see her",
            "C": "since I saw her",
            "D": "until I saw her"
          },
          "answer": "C",
          "explanation": "Căn cứ vào cấu trúc: It is + thời gian + since + V (quá khứ đơn).\u000b- Dịch nghĩa: Tôi muốn gặp Tina một lần nữa. Đã từ nhiều năm kể từ lần cuối tôi gặp cô ấy.\u000b+ Loại A, B: vì sai cấu trúc.\u000b+ Loai D: không hợp nghĩa. (cho đến khi tôi gặp cô ấy).\u000b=> Chọn C."
        },
        {
          "num": 14,
          "type": "choice",
          "text": "Bod and Alice have been married_____.",
          "options": {
            "A": "that 20 years",
            "B": "since 20 years",
            "C": "when 20 years",
            "D": "for 20 years"
          },
          "answer": "D",
          "explanation": "Căn cứ:\u000b+ for + khoảng thời gian. Ex: I have learnt English for six years.\u000b+ since + mốc thời gian. Ex: I have learnt English since 2013.\u000b- Dịch nghĩa: Bob và Alice đã kết hôn được 20 năm."
        },
        {
          "num": 15,
          "type": "choice",
          "text": "- I am looking for Paul. You_____him? - Yes, he was here a minute ago.",
          "options": {
            "A": "Have - seen",
            "B": "Did - see",
            "C": "Do - see",
            "D": "Is - seeing"
          },
          "answer": "A",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại hoàn thành: diễn tả hành động xảy ra trong quá khứ nhưng không rõ thời gian\u000b- Dịch nghĩa: Tôi đang tìm Paul. Bạn có thấy anh ấy không? - Có, anh ấy đã ở đây một phút trước."
        },
        {
          "num": 16,
          "type": "choice",
          "text": "Unless she_____extra, she will not complete the work.",
          "options": {
            "A": "is paying",
            "B": "have been paying",
            "C": "pays",
            "D": "is paid"
          },
          "answer": "D",
          "explanation": "Căn cách dùng của “unless” trong câu điều kiện loại 1: \n      Unless + S + V (hiện tại đơn), S + will/ can/ may + V (bare)\u000b- Dịch nghĩa: Nếu cô ấy không được trả thêm, cô ấy sẽ không hoàn thành công việc.\u000b=> Vế cần chia mang nghĩa bị động."
        },
        {
          "num": 17,
          "type": "choice",
          "text": "The house at the end of the street which_____empty for years has been sold.",
          "options": {
            "A": "is",
            "B": "have been",
            "C": "is being",
            "D": "has been"
          },
          "answer": "D",
          "explanation": "Căn cứ dấu hiệu của thì hiện tại hoàn thành: for + khoảng thời gian.\u000b- Dịch nghĩa: Căn nhà ở cuối đường mà bị bỏ trống trong nhiều năm đã được bán."
        },
        {
          "num": 18,
          "type": "choice",
          "text": "All right, you’ll try to fix the television! But I_____you know what you’re doing.",
          "options": {
            "A": "hope",
            "B": "have hoped",
            "C": "is hoping",
            "D": "have been hoping"
          },
          "answer": "A",
          "explanation": "=> Key: A. hope\u000b=> Vì: không có dấu hiệu về thì rõ ràng và dịch theo nghĩa nên để hiện tại đơn\u000b=> Dịch: Được rồi, bạn sẽ cố gắng sửa tivi! Nhưng tôi hi vọng bạn biết bạn đang làm gì."
        },
        {
          "num": 19,
          "type": "choice",
          "text": "Who_____at the door?",
          "options": {
            "A": "knock",
            "B": "is knocking",
            "C": "have been knocking",
            "D": "have knocked"
          },
          "answer": "B",
          "explanation": "=> Key: B. is knocking\u000b=> Vì: theo cách dùng của thì hiện tại tiếp diễn, diễn tả một sự việc bất thường, đang diễn ra tại thời điểm nói\u000b=> Dịch: Ai đang gõ cửa vậy?"
        },
        {
          "num": 20,
          "type": "choice",
          "text": "How long it_____you to get to the library?",
          "options": {
            "A": "does - take",
            "B": "have - taken",
            "C": "is - taking",
            "D": "have - been taking"
          },
          "answer": "A",
          "explanation": "Căn cứ vào ngữ cảnh của câu ta chia thì hiện tại đơn.\nCấu trúc: \nIt takes sb time to do st: mất của ai đó bao nhiêu thời gian để làm gì\u000b- Dịch nghĩa: Mất bao lâu để bạn đi đến thư viện?"
        },
        {
          "num": 21,
          "type": "choice",
          "text": "Many girls want to go to the pub while only a minority_____to watch TV at home now.",
          "options": {
            "A": "is wanting",
            "B": "want",
            "C": "will want",
            "D": "wants"
          },
          "answer": "D",
          "explanation": "Dịch: Ngày nay trong khi nhiều cô gái muốn đến quán rượu thì chỉ có một nhóm ít người muốn ở nhà xem TV. \n=> “Minority” là một danh từ tập hợp, khi nó đi với “of” thì sẽ chia theo danh từ sau “of”. Nhưng trường hợp nó đứng một mình, thì nó thường đi với động từ số ít nhưng cũng có thể đi với động từ số nhiều tùy theo hàm ý của người nói. Có hai trường hợp phổ biến sau:\n- Khi danh từ tập hợp được đề cập đến như là các thành viên của một nhóm… thì động từ theo sau là số nhiều. \n- Khi danh từ tập hợp được đề cập đến như là một nhóm, một đơn vị riêng rẽ thì động từ theo sau là số ít.\n=> Xét ngữ cảnh trong câu, vì vế trước người ta cũng chỉ nói chung chung với hàm ý một nhóm nhiều cô gái, ý nói có nhiều người (nhưng khi dùng “many + N(số nhiều)” thì động từ luôn chia số nhiều) thì vế sau cũng hàm ý chỉ một nhóm người, một tập hợp nào đó được xem như một đơn vị riêng lẻ nhưng chỉ có rất ít người, để chỉ hai nhóm người có đặc điểm đối lập nhau chứ không có ý chỉ các cô gái cụ thể nào trong nhóm ấy.\n=> Theo cách dùng thứ hai, ta chia động từ số ít là “wants”."
        },
        {
          "num": 22,
          "type": "choice",
          "text": "They’ve faxed me I should stay till they_____a replacement. Well, last time it took two weeks.",
          "options": {
            "A": "found",
            "B": "will find",
            "C": "find",
            "D": "had found"
          },
          "answer": "C",
          "explanation": "Dịch: Họ đã gửi fax cho tôi bảo tôi nên ở lại cho đến khi họ tìm được người thay thế. Ồ, lần trước phải mất đến hai tuần. \nXét hành động tìm người thay thế chưa xảy ra nên động từ sau “till” chia hiện tại đơn."
        },
        {
          "num": 23,
          "type": "choice",
          "text": "Let’s have some tea. It_____chilly.",
          "options": {
            "A": "gets",
            "B": "is getting",
            "C": "have gotten",
            "D": "have been getting"
          },
          "answer": "B",
          "explanation": "=> Key: B. is getting\u000b=> Vì: theo cách dùng của thì hiện tại tiếp diễn, diễn tả một sự thay đổi, một việc đang diễn ra ở thời điểm nói\u000b=> Dịch: Chúng ta hãy uống trà nhé. Thời tiết đang trở lạnh rồi."
        },
        {
          "num": 24,
          "type": "choice",
          "text": "Don’t talk to him while he_____.",
          "options": {
            "A": "have been reading",
            "B": "reads",
            "C": "is reading",
            "D": "have read"
          },
          "answer": "C",
          "explanation": "=> Key: C. is reading\u000b=> Dựa vào ngữ cảnh của câu và dấu hiệu “while: trong khi” => hiện tại tiếp diễn\u000b=> Dịch: Đừng nói chuyện với anh ấy trong khi anh ấy đang đọc sách."
        },
        {
          "num": 25,
          "type": "choice",
          "text": "Ann wants to see you. You_____here for ages!",
          "options": {
            "A": "have been",
            "B": "are",
            "C": "had been",
            "D": "are being"
          },
          "answer": "A",
          "explanation": "Căn cứ: “for + khoảng thời gian” là dấu hiệu nhận biết thì hiện tại hoàn thành.\u000b- Dịch nghĩa: Ann muốn gặp bạn. Bạn đã ở đây nhiều năm rồi."
        },
        {
          "num": 26,
          "type": "choice",
          "text": "- Your house is very beautiful. How long you_____here? - Nearly ten years.",
          "options": {
            "A": "did - live",
            "B": "have - been living",
            "C": "do - live",
            "D": "is - living"
          },
          "answer": "B",
          "explanation": "=> Vì: dựa vào câu trả lời về khoảng thời gian và cách dùng của thì hiện tại hoàn thành tiếp diễn (diễn tả một hành động bắt đầu ở quá khứ, vẫn còn tiếp tục ở hiện tại và có thể kéo dài đến tương lai, nhấn mạnh vào thời gian, quá trình)\u000b=> Dịch: - Ngôi nhà của bạn rất đẹp. Bạn đã ở đây bao lâu rồi?\u000b- Gần mười năm."
        },
        {
          "num": 27,
          "type": "choice",
          "text": "I_____to the movies for ages. We used to go a lot.",
          "options": {
            "A": "haven’t gone",
            "B": "didn’t go",
            "C": "isn’t going",
            "D": "hadn’t gone"
          },
          "answer": "A",
          "explanation": "=> Vì: có dấu hiệu for ages => Dùng thì hiện tại hoàn thành để diễn tả một hành động đã kéo dài từ trong quá khứ đến hiện tại.\u000b=> Dịch: Tôi đã không tới rạp chiếu phim trong một thời gian dài. Chúng tới đã từng tới đó rất nhiều lần."
        },
        {
          "num": 28,
          "type": "choice",
          "text": "Why are you putting on your coat? You_____out?",
          "options": {
            "A": "Do - go",
            "B": "Have - gone",
            "C": "Had - gone",
            "D": "Are - going"
          },
          "answer": "D",
          "explanation": "Dịch: Sao bạn lại mặc áo khoác vào thế? Bạn định ra ngoài à?\nGiải thích: \n- Căn cứ vào dấu hiệu ở hiện tại \"đang mặc áo khoác\", ta suy ra việc “ra ngoài” là có kế hoạch từ trước. \n-> Căn cứ vào cách dùng của thì hiện tại tiếp diễn, diễn tả một hành động chắc chắn sẽ xảy ra vì có kế hoạch từ trước."
        },
        {
          "num": 29,
          "type": "choice",
          "text": "Look! That plane_____toward the airport. It is going to land.",
          "options": {
            "A": "flies",
            "B": "have flown",
            "C": "is flying",
            "D": "will fly"
          },
          "answer": "C",
          "explanation": "=> Key: C. is flying\u000b=> Vì: có từ Look! và theo cách dùng của hiện tại tiếp diễn: diễn tả một hành động đang diễn ra tại thời điểm nói\u000b=> Dịch: Nhìn này! Chiếc máy bay đó đang bay về hướng sân bay. Nó sắp hạ cánh"
        },
        {
          "num": 30,
          "type": "choice",
          "text": "Ann is very tired. She_____tennis for three hours.",
          "options": {
            "A": "is playing",
            "B": "will play",
            "C": "plays",
            "D": "has been playing"
          },
          "answer": "D",
          "explanation": "=> Key: D. has been playing\u000b=> Vì: có for + khoảng thời gian và cách dùng hiện tại hoàn thành tiếp diễn nhấn mạnh vào thời gian, quá trình.\u000b=> Dịch: Ann rất mệt mỏi. She đã chơi tennis trong ba giờ"
        },
        {
          "num": 31,
          "type": "choice",
          "text": "He works in a bank, but he_____it very much.",
          "options": {
            "A": "doesn’t enjoy",
            "B": "haven’t enjoyed",
            "C": "didn’t enjoy",
            "D": "hadn’t enjoyed"
          },
          "answer": "A",
          "explanation": "Căn cứ: cách sử dụng của thì hiện tại đơn: diễn tả thói quen, sở thích, quan điểm của người nói.\u000b- Dịch nghĩa: Anh ấy làm việc ở một ngân hàng, nhưng anh ấy không thích công việc này lắm."
        },
        {
          "num": 32,
          "type": "choice",
          "text": "I_____well lately. Maybe I should go to the doctor.",
          "options": {
            "A": "didn’t feel",
            "B": "won’t feel",
            "C": "haven’t been feeling",
            "D": "am not feeling"
          },
          "answer": "C",
          "explanation": "Căn cứ: \"lately\" là dấu hiệu nhận biết thì hiện tại hoàn thành. Câu này nhấn mạnh tính liên tục của hành động ta dùng thì hiện tại hoàn thành tiếp diễn. \u000b- Dịch nghĩa: Gần đây tôi không cảm thấy khỏe. Có lẽ tôi nên đi khám bác sĩ."
        },
        {
          "num": 33,
          "type": "choice",
          "text": "I_____my homework for two hours, but I_____yet.",
          "options": {
            "A": "have done - haven’t finished",
            "B": "is doing - isn’t finishing",
            "C": "will do - will not finish",
            "D": "have been doing - haven’t finished"
          },
          "answer": "D",
          "explanation": "=> Key: D. have been doing – haven’t finished\u000b=> Vì: do có dấu hiệu for two hours và yet nên chia thì hiện tại hoàn thành, mà câu đầu tiên nhấn mạnh vào thời gian, quá trình làm nên để hiện tại hoàn thành tiếp diễn, câu 2 nhân mạnh vào kết quả nên chỉ cần chia hiện tại hoàn thành\u000b=> Dịch: Tôi đã làm bài tập về nhà của tôi trong hai giờ, nhưng tôi vẫn chưa xong."
        },
        {
          "num": 34,
          "type": "choice",
          "text": "Let’s take our travel chess set in case we_____bored on the train.",
          "options": {
            "A": "get",
            "B": "are getting",
            "C": "got",
            "D": "have got"
          },
          "answer": "A",
          "explanation": "=> Vì: sau in case luôn chia thì hiện tại đơn\u000b=> Dịch: Hãy đem theo bộ cờ du lịch của chúng ta trong trường hợp chúng ta thấy chán trên tàu"
        },
        {
          "num": 35,
          "type": "choice",
          "text": "We_____get in touch with our customers by post.",
          "options": {
            "A": "recently",
            "B": "hardly",
            "C": "lately",
            "D": "latterly"
          },
          "answer": "B",
          "explanation": "A. recently: gần đây\nB. hardly: hầu như không, ít khi\nC. lately: gần đây\nD. latterly: gần đây, mới đây\n=> Căn cứ vào động từ “get” chia ở thì hiện tại đơn nên ta loại đáp án A,C, D.\n- Dịch nghĩa: Chúng tôi ít khi liên lạc với khách hàng qua đường bưu điện."
        },
        {
          "num": 36,
          "type": "choice",
          "text": "We have been married_____.",
          "options": {
            "A": "over twenty years",
            "B": "over twenty years ago",
            "C": "for over twenty years",
            "D": "since over twenty years"
          },
          "answer": "C",
          "explanation": "Căn cứ: “for + khoàng thời gian”; “since + mốc thời gian”.\u000b- Dịch nghĩa: Chúng tôi đã kết hôn hơn hai mươi năm."
        },
        {
          "num": 37,
          "type": "choice",
          "text": "Melanie_____her hand. It’s bleeding heavily.",
          "options": {
            "A": "has cut",
            "B": "is cutting",
            "C": "cut",
            "D": "cuts"
          },
          "answer": "A",
          "explanation": "Dịch: Melanie đã bị đứt tay. Máu đang chảy rất nhiều. \n=> Hành động đứt tay đã xảy ra trong quá khứ nhưng để lại hậu quả ở hiện tại nên ta chia ở thì hiện tại hoàn thành."
        },
        {
          "num": 38,
          "type": "choice",
          "text": "“When will Mary be able to leave hospital?” - “Don’t be so impatient. We cannot release her before we_____the last test.”",
          "options": {
            "A": "have completed",
            "B": "will have completed",
            "C": "will complete",
            "D": "completed"
          },
          "answer": "A",
          "explanation": "Dịch nghĩa: \n- “Khi nào Mary có thể xuất viện?”\n- “Đừng nôn nóng thế. Chúng tôi không thể cho cô ấy xuất viện trước khi chúng tôi khám xong cho cô ấy lần cuối.”\n=> Mệnh đề trạng ngữ chỉ thời gian before không chia thì tương lai nên ta loại phương án B, C. \n=> Xét nghĩa của câu ta thấy việc khám cho Mary chưa diễn ra nên ta không thể chia thì quá khứ đơn. Do đó, loại phương án D."
        },
        {
          "num": 39,
          "type": "choice",
          "text": "The Amazon River_____into the Atlantic Ocean.",
          "options": {
            "A": "flows",
            "B": "has flowed",
            "C": "is flowing",
            "D": "will flow"
          },
          "answer": "A",
          "explanation": "=> Key: A. flows\u000b=> Vì: cách dùng của hiện tại đơn: diễn tả một sự thật hiển nhiên\u000b=> Dịch: Sông Amazon chảy vào Đại Tây Dương"
        },
        {
          "num": 40,
          "type": "choice",
          "text": "My parents live in_____London. They_____there_____all their lives.",
          "options": {
            "A": "are living",
            "B": "had lived",
            "C": "have lived",
            "D": "will live"
          },
          "answer": "C",
          "explanation": "=> Key: C. have lived\u000b=> Vì: cách dùng của thì hiện tại hoàn thành: diễn tả một hành động bắt đầu ở quá khứ, vẫn còn tiếp tục ở hiện tại và có thể kéo dài đến tương lai\u000b=> Dịch: Bố mẹ tôi sống ở London. Họ đã sống cả cuộc đời ở đó."
        },
        {
          "num": 41,
          "type": "choice",
          "text": "Where have you been? I_____for you for the last half hour.",
          "options": {
            "A": "am looking",
            "B": "have been looking",
            "C": "will be looking",
            "D": "look"
          },
          "answer": "B",
          "explanation": "=> Key: B. have been looking\u000b=> Vì: : có for + khoảng thời gian => hiện tại hoàn thành. Khi muốn nhấn mạnh tính liên tục của hành động ta dùng thì hiện tại hoàn thành tiếp diễn; \u000b=> Dịch: Bạn đã ở đâu? Tôi đã tìm bạn trong nửa giờ qua."
        },
        {
          "num": 42,
          "type": "choice",
          "text": "My brother is an actor. He_____in several movies.",
          "options": {
            "A": "appeared",
            "B": "had appeared",
            "C": "has appeared",
            "D": "appears"
          },
          "answer": "C",
          "explanation": "Dịch: Anh tôi là một diễn viên. Anh ấy đã xuất hiện trong một vài bộ phim. \nGiải thích: “đã xuất hiện trong một vài bộ phim” là hành động lặp đi lặp lại nhiều lần trong quá khứ nên ta chia thì hiện tại hoàn thành. \nĐáp án C"
        },
        {
          "num": 43,
          "type": "choice",
          "text": "Please don’t bother him now. He_____.",
          "options": {
            "A": "is working",
            "B": "has been working",
            "C": "had been working",
            "D": "was working"
          },
          "answer": "A",
          "explanation": "Dịch: Bây giờ đừng làm phiền anh ấy. Anh ấy đang làm việc.\n=> Vế trước đã cho thấy dấu hiệu hành động đang xảy ra tại thời điểm nói (now), do đó ta chia động từ ở thì hiện tại tiếp diễn."
        },
        {
          "num": 44,
          "type": "choice",
          "text": "I_____an interesting book at the moment. I will lend it to you when I_____it.",
          "options": {
            "A": "am reading - have finished",
            "B": "read - am finishing",
            "C": "have read - am finishing",
            "D": "read - will finish"
          },
          "answer": "A",
          "explanation": "Căn cứ: “at the moment” là dấu hiệu nhận biết thì hiện tại tiếp diễn.\u000b- Dịch nghĩa: Tại thời điểm này, tôi đang đọc một cuốn sách thú vị. Tôi sẽ cho bạn mượn nó khi tôi đọc xong."
        },
        {
          "num": 45,
          "type": "choice",
          "text": "Ha never_____fishing in the winter but she always_____it in the summer.",
          "options": {
            "A": "goes - does",
            "B": "has gone - done",
            "C": "go - do",
            "D": "was gone - done"
          },
          "answer": "A",
          "explanation": "Căn cứ: trạng từ “never” và “always” là dấu hiệu nhận biết thì hiện tại đơn. Đồng thời, câu đang mô tả một thói quen lặp đi lặp lại của một ai đó nên ta dùng thì hiện tại đơn.\u000b- Dịch nghĩa: Hà không bao giờ đi câu cá vào mùa đông nhưng cô ấy luôn luôn làm vào mùa hè."
        },
        {
          "num": 46,
          "type": "choice",
          "text": "We can win only if we remain united, so we must support them the moment they_____on strike.",
          "options": {
            "A": "will have gone",
            "B": "will go",
            "C": "go",
            "D": "went"
          },
          "answer": "C",
          "explanation": "Tạm dịch: Chúng ta chỉ có thể thắng nếu chúng ta hợp sức lại, vì vậy chúng ta phải hỗ trợ họ khi họ đình công. \n=> Việc đình công chưa xảy ra nên ta loại phương án D (quá khứ đơn)\n=> The moment = when. Mênh đề  trạng ngữ chỉ thời gian when không chia thì tương lai nên loại A, B.\nDo đó, đáp án là C"
        },
        {
          "num": 47,
          "type": "choice",
          "text": "I am sorry. I_____that fellow’s name already.",
          "options": {
            "A": "forgot",
            "B": "have forgotten",
            "C": "have been forgetting",
            "D": "forget"
          },
          "answer": "B",
          "explanation": "Căn cứ: “already” là dấu hiệu nhận biết thì hiện tại hoàn thành.\u000b- Dịch nghĩa: Tôi xin lỗi. Tôi đã quên tên đồng nghiệp đó rồi."
        },
        {
          "num": 48,
          "type": "choice",
          "text": "It usually_____very much in that part of the United States.",
          "options": {
            "A": "is raining",
            "B": "rained",
            "C": "rains",
            "D": "have rained"
          },
          "answer": "C",
          "explanation": "Căn cứ: “usually” là dấu hiệu nhận biết thì hiện tại đơn.\u000b- Dịch nghĩa: Trời thường mưa nhiều ở phần kia của nước Mỹ."
        },
        {
          "num": 49,
          "type": "choice",
          "text": "Look! A man_____after the train. He wants to catch it.",
          "options": {
            "A": "runs",
            "B": "have been running",
            "C": "will run",
            "D": "is running TEST I"
          },
          "answer": "D",
          "explanation": "Căn cứ: “Look! ” là dấu hiệu nhận biết thì hiện tại tiếp diễn.\u000b- Dịch nghĩa: Nhìn kìa! Một người đàn ông đang chạy sau tàu hỏa. Anh ấy muốn bắt kịp nó."
        }
      ]
    },
    {
      "name": "Exercise 6",
      "description": "Mark the letter A, B, C or D to indicate the correct answer to each of the following questions.",
      "questions": [
        {
          "num": 1,
          "type": "choice",
          "text": "Hoang_____his email four times a week in order not to miss anything important.",
          "options": {
            "A": "checks",
            "B": "will check",
            "C": "is checking",
            "D": "check"
          },
          "answer": "A",
          "explanation": "Giải thích: ta có cụm “four times a week” = bốn lần trong tuần, chỉ tần xuất công việc được làm → sử dụng thì hiện tại đơn.\u000bDịch: Hoàng kiểm tra email bốn lần trong tuần để không bỏ lỡ bất kì thứ gì quan trọng"
        },
        {
          "num": 2,
          "type": "choice",
          "text": "Nowadays, people_____social networks with more and more caution.",
          "options": {
            "A": "uses",
            "B": "are using",
            "C": "used",
            "D": "use"
          },
          "answer": "D",
          "explanation": "Giải thích: Ta có trạng từ “nowadays”: ngày nay-> diễn tả thời điểm trong thời điểm hiện tại về một xu thế thịnh thành -> ta dùng thì hiện tại đơn\n*Ta không dùng đáp án B vì nó không phải là hành động xảy ra tại thời điểm nói, mà nó được xem như một sự thật trong thời điểm hiện tại và về sau nữa.\u000bDịch: Ngày nay, mọi người sử dụng mạng xã hội càng thận trọng hơn."
        },
        {
          "num": 3,
          "type": "choice",
          "text": "At the moment, my sister_____her homework, my brother_____games.",
          "options": {
            "A": "is making - is playing",
            "B": "is doing - is playing",
            "C": "does - plays",
            "D": "makes - is playing"
          },
          "answer": "B",
          "explanation": "Giải thích: “at the moment” là dấu hiệu nhận biết thì hiện tại tiếp diễn, hai hành động diễn ra song song → thì hiện tại tiếp diễn\n+ Ta dùng cụm từ cố định: Do homework: làm bài tập về nhà\u000bDịch: Ngay lúc này, chị tôi đang làm bài tập về nhà và em trai tôi đang chơi trò chơi điện tử."
        },
        {
          "num": 4,
          "type": "choice",
          "text": "It’s 7.00 p.m. now and we_____meal together. We usually_____dinner at that time.",
          "options": {
            "A": "have - eat",
            "B": "have - are eating",
            "C": "are having - eat",
            "D": "are having - are eating"
          },
          "answer": "C",
          "explanation": "Giải thích: “7.00 p.m. now” → một điểm thời gian nhất định trong hiện tại → thì hiện tại tiếp diễn.\u000b“usually” → dấu hiệu nhận biết thì hiện đơn\u000bDịch: Bây giờ là 7 giờ tối và chúng tôi đang ăn tối với nhau. Chúng tôi thường ăn tối vào giờ này."
        },
        {
          "num": 5,
          "type": "choice",
          "text": "I_____a bike to school every day but today I_____to school by bus because it was stolen yesterday.",
          "options": {
            "A": "rode - went",
            "B": "ride - am going",
            "C": "ride - go",
            "D": "is riding - am going"
          },
          "answer": "B",
          "explanation": "Tạm dịch: Hàng ngày tôi đi xe đạp đến trường nhưng hôm nay tôi đến trường bằng xe buýt bởi vì xe đạp của tôi bị mất trộm hôm qua. \n- Diễn tả thói quen ta chia thì hiện tại đơn -> ride\n-Thay đổi của thói quen ta chia thì hiện tại tiếp diễn -> am going"
        },
        {
          "num": 6,
          "type": "choice",
          "text": "That Hoa_____in class affects other students around.",
          "options": {
            "A": "always talk",
            "B": "is always talking",
            "C": "always talks",
            "D": "always talking"
          },
          "answer": "B",
          "explanation": "Giải thích: \n- thì hiện tại tiếp diễn dùng để diễn tả sự kêu ca, phàn nàn ( be + always + Ving)\u000bDịch: Việc Hoa thường xuyên nói chuyện trong lớp ảnh hưởng đến các bạn xung quanh."
        },
        {
          "num": 7,
          "type": "choice",
          "text": "Hoang and Phong_____football as they’re having class now.",
          "options": {
            "A": "don’t play",
            "B": "are playing",
            "C": "doesn’t play",
            "D": "aren’t playing"
          },
          "answer": "D",
          "explanation": "Giải thích:\u000b- Căn cứ vào \" now\" => chia thì hiện tại tiếp diễn\u000bDịch: Hoàng và Phong không đá bóng bây giờ vì họ đang phải học."
        },
        {
          "num": 8,
          "type": "choice",
          "text": "Hoa usually_____charge of doing the washing-up in her family.",
          "options": {
            "A": "takes",
            "B": "is taking",
            "C": "take",
            "D": "will take"
          },
          "answer": "A",
          "explanation": "Giải thích: “usually” trạng từ chỉ tần xuất, dấu hiệu nhận biết thì hiện tại đơn.\u000bTake charge: chịu trách nhiệm\u000bDịch: Hoa thường chịu trách nhiệm việc rửa bát trong gia đình cô ấy."
        },
        {
          "num": 9,
          "type": "choice",
          "text": "Our friends_____for the fashion show now.",
          "options": {
            "A": "is preparing",
            "B": "are preparing",
            "C": "prepares",
            "D": "prepare"
          },
          "answer": "B",
          "explanation": "Giải thích: “now” là dấu hiệu nhận biết thì hiện tại tiếp diễn\u000bDịch: Bạn của chúng tôi đang chuẩn bị cho một buổi biểu diễn thời trang bây giờ."
        },
        {
          "num": 10,
          "type": "choice",
          "text": "All staff in this restaurant_____an urgent meeting right now.",
          "options": {
            "A": "are attending",
            "B": "is attending",
            "C": "attends",
            "D": "attend"
          },
          "answer": "A",
          "explanation": "Giải thích: “right now”: ngay bây giờ → dấu hiệu nhận biết thì hiện tại tiếp diễn.\u000bDịch: Tất cả nhân viên của nhà hàng này đang có mặt tại một cuộc họp khẩn ngay bây giờ."
        },
        {
          "num": 11,
          "type": "choice",
          "text": "After the physics lesson, the children know that water_____at 100 Degrees",
          "options": {
            "C": "boils",
            "A": "will boil",
            "B": "is boiling",
            "D": "boil"
          },
          "answer": "C",
          "explanation": "Giải thích: \n- thì hiện tại đơn dùng để diễn tả chân lí, sự thật đúng\n- căn cứ vào “water” là danh từ không đếm được nên động từ chia ở số ít\u000bDịch: Sau tiết học môn vật lý, bọn trẻ biết rằng nước sôi ở mức 100 độ C."
        },
        {
          "num": 12,
          "type": "choice",
          "text": "My mom_____to the supermarket every Sunday for shopping.",
          "options": {
            "A": "goes",
            "B": "go",
            "C": "is going",
            "D": "are going"
          },
          "answer": "A",
          "explanation": "Giải thích: “every Sunday” chỉ tần suất thực hiện hành động → hiện tại đơn\u000bDịch: Mẹ tôi đi siêu thị chủ nhật hành tuần để mua đồ."
        },
        {
          "num": 13,
          "type": "choice",
          "text": "Look! Minh_____on stage. She looks so beautiful.",
          "options": {
            "A": "sings",
            "B": "are singing",
            "C": "is singing",
            "D": "sang"
          },
          "answer": "C",
          "explanation": "Giải thích: Động từ chỉ hình thái “Look” → hiện tại tiếp diễn\u000bDịch: Nhìn kìa! Minh đang hát trên sân khấu. Cô ấy trông thật xinh đẹp."
        },
        {
          "num": 14,
          "type": "choice",
          "text": "Bich sometimes_____chicken noodle soup for breakfast.",
          "options": {
            "A": "are having",
            "B": "is having",
            "C": "have",
            "D": "has"
          },
          "answer": "D",
          "explanation": "Giải thích: trạng từ tần xuất “sometimes”, hành động mô tả một thói quen → hiện tại đơn.\u000bDịch: Bích thỉnh thoảng ăn phở gà vào bữa sáng."
        },
        {
          "num": 15,
          "type": "choice",
          "text": "Who_____the guitar in that room, Hoa?",
          "options": {
            "A": "playing",
            "B": "is playing",
            "C": "play",
            "D": "plays"
          },
          "answer": "B",
          "explanation": "Giải thích: một hành động đang diễn ra ngay tại thời điểm nói → hiện tại tiếp diễn\u000bDịch: Ai đàn chơi đàn ghi-ta trong phòng đó vậy, Hoa?"
        },
        {
          "num": 16,
          "type": "choice",
          "text": "Jenny often_____jeans and T-shirt at school but she_____a gorgeous dress today.",
          "options": {
            "A": "wears - is wearing",
            "B": "is wearing - wears",
            "C": "wear - is wearing",
            "D": "wears - wears"
          },
          "answer": "A",
          "explanation": "Giải thích: Mệnh đề đầu tiên có trạng từ tần xuất “often” →hiện tại đơn\u000bMệnh đề sau “but” có trạng từ thời gian “today”, sự việc được nói đến trong khoảng thời gian xung quanh thời điểm nói → hiện tại tiếp diễn"
        },
        {
          "num": 17,
          "type": "choice",
          "text": "First thing in the morning, I_____a cup of milk tea.",
          "options": {
            "A": "has",
            "B": "am having",
            "C": "have",
            "D": "will have"
          },
          "answer": "C",
          "explanation": "Giải thích: “First thing in the morning” = điều đầu tiên trong buổi sáng → chỉ một thói quen → hiện tại đơn.\u000bDịch: Điều đầu tiên trong buổi sáng, tôi uống một cốc trà sữa."
        },
        {
          "num": 18,
          "type": "choice",
          "text": "Ms. Kim_____very well when she’s under pressure.",
          "options": {
            "A": "not work",
            "B": "don’t work",
            "C": "isn’t working",
            "D": "doesn’t work"
          },
          "answer": "D",
          "explanation": "Giải thích: Mệnh đề sau “when” là hiện tại đơn, diễn tả một đặc điểm, tính chất của con người/sự vật/hiện tượng → hiện tại đơn\u000bDịch: Cô Kim làm việc không tốt khi cô ấy bị áp lực."
        },
        {
          "num": 19,
          "type": "choice",
          "text": "I’m sorry. Lan is busy now. She_____her document on the second floor.",
          "options": {
            "A": "are checking",
            "B": "check",
            "C": "checks",
            "D": "is checking"
          },
          "answer": "D",
          "explanation": "Giải thích: có “now” ở mệnh đề đầu → hiện tại tiếp diễn\u000bDịch: Tôi xin lỗi, Lan đang bây giờ đang bận. Cô ấy đang kiểm tra tài liệu ở tầng hai."
        },
        {
          "num": 20,
          "type": "choice",
          "text": "Hurry up, Linh. Other friends_____for us.",
          "options": {
            "A": "are waiting",
            "B": "waits",
            "C": "wait",
            "D": "is waiting"
          },
          "answer": "A",
          "explanation": "Giải thích: “Hurry up” = nhanh lên → lời thúc giục → hiện tại tiếp diễn\u000bDịch: Nhanh lên, Linh. Những bạn khác đang đợi chúng ta."
        },
        {
          "num": 21,
          "type": "choice",
          "text": "My clothes are not in the room. They_____them away.",
          "options": {
            "A": "take",
            "B": "have taken",
            "C": "took",
            "D": "are taking"
          },
          "answer": "B",
          "explanation": "Giải thích: Hành động đã xảy ra và còn để lại kết quả ở hiện tại → hiện tại hoàn thành\u000bDịch: Quần áo của tôi không còn trong phòng. Họ vừa đem chúng đi rồi."
        },
        {
          "num": 22,
          "type": "choice",
          "text": "She_____for 10 hours! You must wake her up.",
          "options": {
            "A": "sleeps",
            "B": "is sleeping",
            "C": "has been sleeping",
            "D": "slept"
          },
          "answer": "C",
          "explanation": "Giải thích: Hành động đã xảy ra trong quá khứ vã vẫn đang tiếp tục xảy ra ở hiện tại trong một khoảng thời gian dài → hiện tại hoàn thành tiếp diễn\u000bDịch: Cô ấy đã ngủ được 10 tiếng đồng hồ rồi. Bạn cần gọi cô ấy dậy."
        },
        {
          "num": 23,
          "type": "choice",
          "text": "David_____the TV set at the moment. He_____at it for one hour or so.",
          "options": {
            "A": "is repairing/ has worked",
            "B": "repairs/has been working",
            "C": "has repaired/has been working",
            "D": "repairs/worked"
          },
          "answer": "A",
          "explanation": "Giải thích: Mệnh đề đầu: “at the moment” → dấu hiệu nhận biết thì hiện tại tiếp diễn → loại B,C,D.\u000bMệnh đề sau: sử dụng hiện tại hoàn thành mô tả hành động đã xảy ra trong quá khứ kéo dài đến hiện tại, dấu hiệu nhận biết “for one hour or so”.\u000bDịch: David đang chữa đầu TV. Anh đã phải sửa nó được 1 tiếng đồng hồ hoặc hơn."
        },
        {
          "num": 24,
          "type": "choice",
          "text": "David_____his hands. He just_____the TV set.",
          "options": {
            "A": "washes/has just repaired",
            "B": "is washing/has just been repairing",
            "C": "is washing/ has just repaired",
            "D": "has washed/ has just repaired"
          },
          "answer": "C",
          "explanation": "Giải thích: Mệnh đề đầu: hành động đang diễn ra tại thời điểm nói.\u000bMệnh đề sau: “just” → dấu hiệu nhận biết hiện tại hoàn thành. Hành động sửa TV đã xảy ra và vừa mới có kết quả ở hiện tại.\u000bDịch: David đang rửa tay. Anh ấy vừa mới sửa ti vi."
        },
        {
          "num": 25,
          "type": "choice",
          "text": "Why_____?_____you his anecdotes?",
          "options": {
            "A": "are you laughing/has Jim told",
            "B": "are you laughing/has Jim been telling",
            "C": "have you laughed/ has Jim told",
            "D": "have you laughed/ has Jim been telling"
          },
          "answer": "B",
          "explanation": "Giải thích: + Hành động mọi người đang cười xảy ra ngay tại thời điểm nói → hiện tại tiếp diễn. \n+ Câu chuyện đó đã được kể và để lại kết quả hiện tại → chia hiện tại hoàn thành. Tuy nhiên, ở đây nhằm ý nhấn mạnh quá trình của hành động “kể chuyện” nó kéo dài từ trước, cho đến khi có hành động “cười” nên ta dùng thì hiện tại hoàn thành tiếp diễn.\u000bDịch: Tại sao tất cả mọi người đều cười? Jim vừa kể câu chuyện vặt của anh ta à?"
        }
      ]
    },
    {
      "name": "Exercise 7",
      "description": "Complete the following sentences using the past simple forms of the verbs in brackets.",
      "questions": [
        {
          "num": 1,
          "type": "fill",
          "text": "I_____(lose) my key yesterday.",
          "answer": "lost",
          "explanation": "Căn cứ vào dấu hiệu của thì quá khứ đơn: yesterday. – Dịch: Tôi đã mất chìa khóa của mình ngày hôm qua."
        },
        {
          "num": 2,
          "type": "fill",
          "text": "People_____(build) this school in 2001.",
          "answer": "built",
          "explanation": "Căn cứ vào dấu hiệu của thì quá khứ đơn: in + mốc thời gian quá khứ."
        },
        {
          "num": 3,
          "type": "fill",
          "text": "Last year, my father_____(promise) to buy my sister a piano. She_____(be) very delighted to hear this.",
          "answer": "promised",
          "explanation": "Căn cứ vào dấu hiệu của thì quá khứ đơn: Last + night/ week/ year."
        },
        {
          "num": 4,
          "type": "fill",
          "text": "It_____(be) very hot last summer.",
          "answer": "was",
          "explanation": "Căn cứ vào: “last summer” là dấu hiệu của thì quá khứ đơn."
        },
        {
          "num": 5,
          "type": "fill",
          "text": "I_____(walk) home after the party last night.",
          "answer": "walked",
          "explanation": "Căn cứ vào: “last night” là dấu hiệu của thì quá khứ đơn."
        },
        {
          "num": 6,
          "type": "fill",
          "text": "The Chinese_____(invent) printing.",
          "answer": "invented",
          "explanation": "Căn cứ vào cách dùng của thì quá khứ đơn: diễn tả các sự việc đã xảy ra trong quá khứ."
        },
        {
          "num": 7,
          "type": "fill",
          "text": "Sam and I_____(play) tennis yesterday. He was much better than I was, so he_____(win) easily.",
          "answer": "played",
          "explanation": "Căn cứ vào dấu hiệu của thì quá khứ đơn: yesterday."
        },
        {
          "num": 8,
          "type": "fill",
          "text": "My grandpa_____(die) 30 years ago. I never_____(meet) him.",
          "answer": "died / met",
          "explanation": "Căn cứ vào trạng từ thời gian của thì quá khứ đơn “ago” nên ta chia: die -> died. - Vì ông đã mất từ 30 năm trước nên không bao giờ gặp được ông nữa nên vế sau ta chia ở quá khứ đơn. Vì hành động “không thể gặp” nó cũng đã diễn ra trong quá khứ, cùng với hành động kể lại một trải nghiệm đã qua nên ta chia quá khứ đơn cho cả hai vế. meet-> met – Dịch: Ông tôi đã mất 30 năm trước. Tôi chưa bao giờ gặp ông."
        },
        {
          "num": 9,
          "type": "fill",
          "text": "- You_____(go) to the movies last night? - Yes, but it_____(be) a mistake. The movie_____(be) awful.",
          "answer": "Did you go",
          "explanation": "* Căn cứ vào: - “last night” là dấu hiệu của thì quá khứ đơn."
        },
        {
          "num": 10,
          "type": "fill",
          "text": "When I_____(get) home last night, I_____(be) very tired, so I _____(go) straight to the bed.",
          "answer": "got",
          "explanation": "Căn cứ vào: “last night” là dấu hiệu của thì quá khứ đơn. + “thì quá khứ đơn” dùng để diễn tả những hành động xảy ra liên tiếp trong quá khứ."
        },
        {
          "num": 11,
          "type": "fill",
          "text": "Diane_____(use) to travel a lot. These days she doesn’t take many trips.",
          "answer": "used",
          "explanation": "Căn cứ vào cách dùng của USED TO + V: diễn tả thói quen trong quá khứ."
        },
        {
          "num": 12,
          "type": "fill",
          "text": "- When Joe and Carol_____(meet) each other? - They first_____(meet) when they_____(be) in high school.",
          "answer": "did …. meet/met/were",
          "explanation": "Dịch: - Joe và Carol gặp nhau khi nảo? - Họ gặp nhau lần đầu khi họ còn học ở phổ thông. => Tất cả các hành động đã xảy ra và đã kết thúc trong quá khứ nên ta chia ở thì quá khứ đơn."
        },
        {
          "num": 13,
          "type": "fill",
          "text": "When Sarah_____(get) to the party last night, Eric had already gone home.",
          "answer": "got",
          "explanation": "Căn cứ vào mệnh đề trạng ngữ chỉ thời gian: When S + V (quá khứ đơn), S + V (quá khứ hoàn thành)."
        },
        {
          "num": 14,
          "type": "fill",
          "text": "I_____(ring) you up two days ago but I_____(get) no answer. Where you_____(be)?",
          "answer": "rang",
          "explanation": "Căn cứ vào dấu hiệu của thì quá khứ đơn: “two days ago”."
        },
        {
          "num": 15,
          "type": "fill",
          "text": "When I_____(be) small, I often_____(play) with a doll.",
          "answer": "was",
          "explanation": "Căn cứ vào mệnh đề trạng ngữ chỉ thời gian: when S + V (quá khứ đơn), S + V (quá khứ đơn) (kể về một hồi ức)"
        }
      ]
    },
    {
      "name": "Exercise 8",
      "description": "Complete the following sentences using the past continuous forms of the verbs in brackets.",
      "questions": [
        {
          "num": 1,
          "type": "fill",
          "text": "This time last year I_____(live) in Brazil.",
          "answer": "was living",
          "explanation": "Căn cứ vào dấu hiệu của thì quá khứ tiếp diễn: this time + mốc thời gian quá khứ."
        },
        {
          "num": 2,
          "type": "fill",
          "text": "What you_____(do) at 10:00 last night?",
          "answer": "What were you doing……",
          "explanation": "Căn cứ vào dấu hiệu của thì quá khứ tiếp diễn- xảy ra tại một thời điểm cụ thể trong quá khứ: at 10:00 + mốc thời gian quá khứ."
        },
        {
          "num": 3,
          "type": "fill",
          "text": "At that time yesterday, I_____(write) a letter.",
          "answer": "was writing",
          "explanation": "Căn cứ vào dấu hiệu của thì quá khứ tiếp diễn: at that time + mốc thời gian quá khứ."
        },
        {
          "num": 4,
          "type": "fill",
          "text": "She_____(learn) English at school at 7:45 yesterday morning.",
          "answer": "was learning",
          "explanation": "Căn cứ vào dấu hiệu của thì quá khứ tiếp diễn: at 7:45 yesterday morning + mốc thời gian quá khứ."
        },
        {
          "num": 5,
          "type": "fill",
          "text": "- What you_____(do) at this time last night? - I was asleep.",
          "answer": "were",
          "explanation": "Căn cứ vào dấu hiệu của thì quá khứ tiếp diễn: at that time + mốc thời gian quá khứ."
        },
        {
          "num": 6,
          "type": "fill",
          "text": "Matt burned his hand while he_____(cook) lunch.",
          "answer": "was cooking",
          "explanation": "Căn cứ vào cách dùng của thì quá khứ tiếp diễn: một hành động xảy ra thì có một hành động khác xen vào."
        },
        {
          "num": 7,
          "type": "fill",
          "text": "I saw you in the park yesterday. You_____(sit) on the grass and _____(read) a book.",
          "answer": "were sitting / reading | were sitting / were reading",
          "explanation": "Căn cứ vào ngữ cảnh của câu ta chia thì quá khứ tiếp diễn."
        },
        {
          "num": 8,
          "type": "fill",
          "text": "When I came home, my mother_____(prepare) the meal.",
          "answer": "was preparing",
          "explanation": "* Căn cứ vào sự phối thì giữa thì quá khứ đơn và quá khứ tiếp diễn: - when S + V(quá khứ đơn), S + V(quá khứ tiếp diễn). ( Dùng để diễn tả hành động đang xảy ra thì có hành động khác xen vào). * Dịch nghĩa: Khi tôi về nhà, mẹ tôi đang chuẩn bị bữa ăn. => “nấu ăn” là hành động đang xảy ra => chia thì quá khứ tiếp diễn."
        },
        {
          "num": 9,
          "type": "fill",
          "text": "Jane_____(wait) for me when I arrived.",
          "answer": "was waiting",
          "explanation": "Căn cứ vào cách dùng của thì quá khứ tiếp diễn: một hành động xảy ra thì có một hành động khác xen vào."
        },
        {
          "num": 10,
          "type": "fill",
          "text": "Yesterday evening, while my mother_____(cook) in the kitchen, my father_____(watch) the news on TV.",
          "answer": "was cooking",
          "explanation": "Căn cứ vào cách dùng của thì quá khứ tiếp diễn khi có “while” và “yesterday evening”: diễn tả hai hành động xảy ra song song cùng lúc trong quá khứ."
        },
        {
          "num": 11,
          "type": "fill",
          "text": "Just as I_____(leave) the house, I heard an explosion from the inside the lab.",
          "answer": "was leaving",
          "explanation": "Căn cứ vào cách dùng của thì quá khứ tiếp diễn: một hành động xảy ra thì có một hành động khác xen vào."
        },
        {
          "num": 12,
          "type": "fill",
          "text": "When Beth arrived, we_____(have) dinner.",
          "answer": "were having",
          "explanation": "Căn cứ vào ngữ cảnh của câu ta chia thì quá khứ tiếp diễn."
        },
        {
          "num": 13,
          "type": "fill",
          "text": "Why didn’t you listen to me while I (talk)_____with you?",
          "answer": "was talking",
          "explanation": "* Dịch nghĩa: Tại sao bạn không lắng nghe tôi trong khi tôi nói chuyện với bạn?"
        },
        {
          "num": 14,
          "type": "fill",
          "text": "Michiko couldn’t come to the phone when the director called her because she_____(work) in the factory.",
          "answer": "was working",
          "explanation": "* Dịch: Michiko không thể đến nghe điện thoại khi giám đốc gọi cô ấy bởi vì cô ấy đang làm việc trong nhà máy. * Căn cứ: cách dùng của thì quá khứ tiếp diễn: - Diễn đạt hành động đang xảy ra tại thời điểm trong quá khứ. - Giám đốc gọi khi “cô ấy đang làm việc” -> cô ấy không nghe máy."
        },
        {
          "num": 15,
          "type": "fill",
          "text": "I_____(enjoy) the party, but Chris wanted to go home.",
          "answer": "was enjoying",
          "explanation": "* Dịch nghĩa: Tôi đang thưởng thức bữa tiệc, nhưng Chris muốn về nhà. * Căn cứ cách dùng của thì quá khứ tiếp diễn: - Diễn tả hành động đang xảy ra thì có hành động khác xen vào. + thưởng thức bữa tiệc bị hành động Chris muốn về nhà xen vào. => chia thì quá khứ tiếp diễn."
        }
      ]
    },
    {
      "name": "Exercise 9",
      "description": "Complete the following sentences using the past perfect forms of the verbs in brackets.",
      "questions": [
        {
          "num": 1,
          "type": "fill",
          "text": "Before Sarah arrived, Eric_____(go) home.",
          "answer": "had gone",
          "explanation": "Căn cứ vào cấu trúc của “before” đi với thì quá khứ hoàn thành: Before S + V (quá khứ đơn), S + V (quá khứ hoàn thành). Vế chứa “before” chia quá khứ đơn => vế còn lại chia quá khứ hoàn thành."
        },
        {
          "num": 2,
          "type": "fill",
          "text": "When Jane arrived at the theater, the film_____(start).",
          "answer": "had started",
          "explanation": "Dịch: Khi Jane đến rạp chiếu phim, bộ phim đã bắt đầu rồi. => Diễn tả hành động xảy ra xong trước một hành động khác trong quá khứ ta chia thì quá khứ hoàn thành. *Note: Hành động “start” một bộ phim nó không thể chia ở thì tiếp diễn trong ngữ cảnh này, vì thế không thể chia theo dạng “một hành động đang diễn ra thì có một hành động khác chen vào”, nên không chia vị trí trống này ở dạng quá khứ tiếp diễn được."
        },
        {
          "num": 3,
          "type": "fill",
          "text": "He thanked me for everything I_____(do) for him.",
          "answer": "had done",
          "explanation": "* Dịch nghĩa: Anh ấy cảm ơn tôi vì mọi thứ tôi đã làm cho anh ấy. * Căn cứ vào: - Hành động làm mọi thứ cho anh ấy diễn ra trước việc cảm ơn. => chia thì quá khứ hoàn thành."
        },
        {
          "num": 4,
          "type": "fill",
          "text": "After Angelia_____(eat) the cake, she began to feel sick.",
          "answer": "had eaten",
          "explanation": "Căn cứ vào với cấu trúc của “after” đi với thì quá khứ hoàn thành: After S + V (quá khứ hoàn thành), S + V (quá khứ đơn). Về không chứa “after” chia quá khứ đơn => về còn lại chia quá khứ hoàn thành."
        },
        {
          "num": 5,
          "type": "fill",
          "text": "When he went out to play, he_____(do already) his homework.",
          "answer": "had already done",
          "explanation": "Căn cứ vào cấu trúc của “when” đi với thì quá khứ hoàn thành: When S + V (quá khứ đơn), S + V (quá khứ hoàn thành). Vế chứa “when” chia thì quá khứ đơn => Vế còn lại chia thì quá khứ hoàn thành."
        },
        {
          "num": 6,
          "type": "fill",
          "text": "They_____(be) married for two years or so when Roy employed a very attractive Indian secretary in his Glasgow office.",
          "answer": "had been",
          "explanation": "Dịch nghĩa: Lúc mà Roy thuê một thư kí hấp dẫn người Ấn Độ trong văn phòng Glassgow của ông ấy thì họ đã kết hôn được hai năm hoặc hơn. + việc “kết hôn” xảy ra trước việc “thuê thư kí” => chia thì quá khứ hoàn thành."
        },
        {
          "num": 7,
          "type": "fill",
          "text": "Linda_____(not study) for the exam, so she was very anxious.",
          "answer": "had not studied",
          "explanation": "Căn cứ vào cách dùng của thì quá khứ hoàn thành: Khi hai hành động cùng xảy ra trong quá khứ, ta dùng thì quá khứ hoàn thành cho hành động xảy ra trước và quá khứ đơn cho hành động xảy ra sau. Hành động xảy ra trước “không học tập chăm chỉ” => chia thì quá khứ hoàn thành."
        },
        {
          "num": 8,
          "type": "fill",
          "text": "I couldn’t go into the cinema because I_____(not bring) my tickets.",
          "answer": "hadn’t brought",
          "explanation": "Căn cứ vào cách dùng của thì quá khứ hoàn thành: Khi hai hành động cùng xảy ra trong quá khứ, ta dùng thì quá khứ hoàn thành cho hành động xảy ra trước và quá khứ đơn cho hành động xảy ra sau. Hành động xảy ra trước “không mang theo vé” => chia thì quá khứ hoàn thành."
        },
        {
          "num": 9,
          "type": "fill",
          "text": "The man sitting next to me on the plane was very nervous. He never _____(fly) before.",
          "answer": "had never flown",
          "explanation": "Căn cứ vào dấu hiệu của thì hiện tại hoàn thành: before. - Căn cứ vào động từ “was” ở câu thứ nhất => Hành động “chưa từng bay” tính tới thời điểm \" lo lắng“. Mà hành động ”lo lắng\" chia ở quá khứ đơn thì hành động \" chưa từng bay\" phải xảy ra trước quá khứ đơn => chia quá khứ hoàn thành. – Dịch: Người đàn ông đang ngồi cạnh tôi trên máy bay rất lo lắng. Anh ấy chưa từng bay trước đó."
        },
        {
          "num": 10,
          "type": "fill",
          "text": "The tornado knocked down the tree that we_____(plant).",
          "answer": "had planted",
          "explanation": "Căn cứ vào cách dùng của thì quá khứ hoàn thành: Khi hai hành động cùng xảy ra trong quá khứ, ta dùng thì quá khứ hoàn thành cho hành động xảy ra trước và quá khứ đơn cho hành động xảy ra sau. Hành động xảy ra trước “trồng cây” => chia thì quá khứ hoàn thành."
        },
        {
          "num": 11,
          "type": "fill",
          "text": "Laura_____(not/use) smartphone before, so I showed her how to use it.",
          "answer": "hadn’t used",
          "explanation": "Căn cứ vào cách dùng của thì quá khứ hoàn thành: Khi hai hành động cùng xảy ra trong quá khứ, ta dùng thì quá khứ hoàn thành cho hành động xảy ra xong trước và quá khứ đơn cho hành động xảy ra sau. Hành động xảy ra trước “không sử dụng điện thoại trước đây” => chia thì quá khứ hoàn thành."
        },
        {
          "num": 12,
          "type": "fill",
          "text": "We weren’t hungry. We_____(just have) lunch.",
          "answer": "had just had",
          "explanation": "Căn cứ vào cách dùng của thì quá khứ hoàn thành: Khi hai hành động cùng xảy ra trong quá khứ, ta dùng thì quá khứ hoàn thành cho hành động xảy ra trước và quá khứ đơn cho hành động xảy ra sau. Hành động xảy ra trước “đã ăn trưa rồi” => chia thì quá khứ hoàn thành."
        },
        {
          "num": 13,
          "type": "fill",
          "text": "We didn’t really want to go and see the film again. We_____(already see) it twice - so we said “no” and we went to a shopping mall instead!",
          "answer": "had already seen",
          "explanation": "Dịch nghĩa: Chúng tôi thực sự không muốn đi xem bộ phim đó nữa. Chúng tôi đã xem nó hai lần vì vậy chúng tôi nói “không”, thay vào đó chúng tôi đi mua sắm. Căn cứ vào: - đã xem phim đó hai lần => nhấn mạnh việc này đã xảy ra trước => chia thì quá khứ hoàn thành."
        },
        {
          "num": 14,
          "type": "fill",
          "text": "When thieves stole my favorite feather wallet, I was really upset. I _____(have) it for over five years.",
          "answer": "had been having",
          "explanation": "Dịch nghĩa: Khi những tên trộm lấy cắp ví lông yêu thích của tôi, tôi đã rất buồn. Tôi đã dùng nó hơn năm năm rồi. - Giải thích: Ta thấy việc sử dụng chiếc ví trong 5 năm xảy ra trước hành động tên trộm lấy trộm, mà hành động “lấy trộm” chia quá khứ đơn thì hành động “sử dụng ví” xảy ra trước quá khứ; đồng thời ta căn cứ vào quãng thời gian “for over five years”, ta dùng thì quá khứ hoàn thành tiếp diễn để nhấn mạnh quá trình của hành động."
        },
        {
          "num": 15,
          "type": "fill",
          "text": "Before going to the meeting, he_____(consult) with his lawyers.",
          "answer": "had consulted",
          "explanation": "* Dịch nghĩa: Trước khi đi đến buổi họp, anh ấy đã hỏi ý kiến những luật sư của mình. * Việc “anh ấy hỏi ý kiến” xảy ra trước việc đến buổi họp. => chia thì quá khứ hoàn thành."
        }
      ]
    },
    {
      "name": "Exercise 10",
      "description": "Complete the following sentences using the past perfect continuous forms of the verbs in brackets.",
      "questions": [
        {
          "num": 1,
          "type": "fill",
          "text": "We_____(play) tennis for about an hour when it started to rain heavily.",
          "answer": "had been playing",
          "explanation": "* Căn cứ vào: cách dùng của thì QKHT tiếp diễn. - diễn tả hành động xảy ra liên tục kéo dài trước hành động khác trong quá khứ. - hành động xảy ra liên tục kéo dài “chơi quần vợt trong vòng một giờ”. * Dịch nghĩa: Chúng tôi đã chơi quần vợt trong vòng một giờ thì trời bắt đầu mưa lớn."
        },
        {
          "num": 2,
          "type": "fill",
          "text": "I was very tired when I got home. I_____(work) hard all day.",
          "answer": "had been working",
          "explanation": "* Căn cứ vào: cách dùng của thì QKHT tiếp diễn. - Diễn tả hành động là nguyên nhân của một điều gì đó trong quá khứ. - Đã làm việc cả ngày -> mệt mỏi khi về nhà. * Dịch nghĩa: Tôi đã rất mệt khi về nhà. Tôi đã làm việc cả ngày."
        },
        {
          "num": 3,
          "type": "fill",
          "text": "At last the bus came. He_____(wait) for 20 minutes.",
          "answer": "had been waiting",
          "explanation": "* Căn cứ vào: cách dùng của thì QKHT tiếp diễn. - Diễn tả hành động xảy ra kéo dài liên tục trước thời điểm xác định trong quá khứ. - Hành động anh ấy “chờ trong vòng 20 phút”, diễn ra liên tục trước khi xe buýt đến. * Dịch nghĩa: Cuối cùng xe buýt đến. Anh ấy đã chờ trong 20 phút."
        },
        {
          "num": 4,
          "type": "fill",
          "text": "Jim quit drinking coffee two years ago. He_____(drink) coffee for 20 years.",
          "answer": "had been drinking",
          "explanation": "* Căn cứ vào: cách dùng của thì QKHT tiếp diễn. - Việc anh ấy uống cà phê trong 20 năm => nhấn mạnh tính kéo dài liên tục của hành động. - Nó xảy ra trước việc anh ấy “bỏ uống cà phê 2 năm trước”. => chia thì QKHT tiếp diễn. * Dịch nghĩa: Jim đã bỏ uống cà phê hai năm trước. Anh ấy đã uống trong vòng 20 năm."
        },
        {
          "num": 5,
          "type": "fill",
          "text": "She was out of breath. She_____(run).",
          "answer": "had been running",
          "explanation": "* Căn cứ vào: cách dùng của thì QKHT tiếp diễn. - Diễn đạt hành động là nguyên nhân của một điều gì đó trong quá khứ - Việc “cô ấy thở hổn hển” xảy ra trong quá khứ và là kết quả của hành động “chạy” nên ta dùng thì QKHT tiếp diễn. * Dịch nghĩa: Cô ấy thở hổn hển. Cô ấy đã chạy."
        },
        {
          "num": 6,
          "type": "fill",
          "text": "It wasn’t raining when we went out. The sun was shining. But it_____ (rain), so the ground was wet.",
          "answer": "had been raining",
          "explanation": "* Căn cứ vào: cách dùng của thì quá khứ hoàn thành tiếp diễn - Nhấn mạnh tính liên tục của hành động tính tới trước một hành động khác trong quá khứ - \"mặt đất ướt\" là kết quả của việc \"trời mưa\". Mà hành động đất ẩm ướt chia quá khứ đơn thì hành động trời mưa phải xảy ra trước nên ta chia quá khứ hoàn thành tiếp diễn * Dịch nghĩa: Trời không mưa khi chúng tôi ra ngoài. Mặt trời đang chiếu sáng. Nhưng trời đã mưa, vì vậy mặt đất ướt."
        },
        {
          "num": 7,
          "type": "fill",
          "text": "We were extremely tired at the end of our trip. We_____(travel) for more than 24 hours.",
          "answer": "had been travelling",
          "explanation": "* Căn cứ vào: cách dùng của thì QKHT tiếp diễn. - Nhấn mạnh hành động để lại kết quả trong quá khứ. - Việc cực kì mệt\" ở cuối chuyến đi là kết quả của việc “đã di chuyển hơn 24 tiếng”. => chia thì QKHT tiếp diễn. * Dịch nghĩa: Chúng tôi đã cực kì mệt ở cuối chuyến đi. Chúng tôi đã đi du lịch trong hơn 24 giờ."
        },
        {
          "num": 8,
          "type": "fill",
          "text": "I was exhausted at the end of the test. I_____(write) for over three hours.",
          "answer": "had been writing",
          "explanation": "* Căn cứ vào: cách dùng của thì QKHT tiếp diễn. - Nhấn mạnh hành động để lại kết quả trong quá khứ. - Việc \"kệt sức\" đã xảy ra trong quá khứ và là kết quả của việc \"viết trong hơn ba giờ\". * Dịch nghĩa: Tôi đã kiệt sức ở cuối bài kiểm tra. Tôi đã viết trong hơn ba giờ."
        },
        {
          "num": 9,
          "type": "fill",
          "text": "The orchestra_____(play) for 30 minutes when a man in audience suddenly began shouting.",
          "answer": "had been playing",
          "explanation": "* Căn cứ vào: cách dùng của thì QKHT tiếp diễn. - Diễn đạt hành động xảy ra trước hành động khác trong quá khứ. (Nhấn mạnh tính liên tục của hành động). - “trong 30 phút” nhấn mạnh “dành nhạc đã chơi trong 30 phút”. * Dịch nghĩa: Dàn nhạc đang chơi được 30 phút thì một người đàn ông trong số những khán giả bắt đầu la hét."
        },
        {
          "num": 10,
          "type": "fill",
          "text": "At the time the factory closed down, Sarah_____(work) there for five years.",
          "answer": "had been working",
          "explanation": "* Căn cứ vào: cách dùng của thì QKHT tiếp diễn. - Nhấn mạnh hành động đang xảy ra trước một hành động khác trong quá khứ (nhấn mạnh tính tiếp diễn). - “trong vòng 5 năm” nhấn mạnh thời gian “Sarah đã làm việc”. => chia thì QKHT tiếp diễn. * Dịch nghĩa: Vào thời điểm nhà máy đóng cửa, Sarah đã làm việc ở đây trong vòng 5 năm."
        },
        {
          "num": 11,
          "type": "fill",
          "text": "- She_____(watch) TV for 4 hours before she went to eat dinner?",
          "answer": "Had",
          "explanation": "* Căn cứ vào: cách dùng của thì QKHT tiếp diễn. - Diễn tả hành động xảy ra liên tục kéo dài trước một hành động khác trong quá khứ. - “for 4 hours” nhấn mạnh đến hành động “cô ấy đã xem TV trong 4 giờ trước khi ăn tối”. * Dịch nghĩa: Trước khi cô ấy đi ăn tối cô ấy đã xem TV trong 4 giờ phải không?"
        },
        {
          "num": 12,
          "type": "fill",
          "text": "She was very upset because I was late and she _____(wait) for a very long time.",
          "answer": "had been waiting",
          "explanation": "* Căn cứ vào: cách dùng của thì QKHT tiếp diễn. - Dùng để diễn đạt hành động xảy ra kéo dài liên tục trước một hành động khác trong quá khứ. - “for a very long time” nhấn mạnh hành động chờ “rất lâu”. * Dịch nghĩa: Cô ấy đã rất thất vọng bởi vì tôi đến muộn và cô ấy đã chờ rất lâu."
        },
        {
          "num": 13,
          "type": "fill",
          "text": "When the boys came into the house, their clothes were dirty, their hair was messy and one of them had a black eye. They_____(fight).",
          "answer": "had been fighting",
          "explanation": "Dịch: Khi những cậu bé bước vào nhà, quần áo của chúng lấm lem, đầu tóc rối bời và một trong số chúng có một mắt bị tím bầm. Chúng đã đánh nhau. => Hành động đánh nhau xảy ra trước hành động bước vào nhà. Mà hành động bước vào nhà chia ở thì quá khứ đơn thì hành động đánh nhau phải chia ở thì quá khứ hoàn thành. => Tuy nhiên, do hành động đánh nhau đã xảy ra xong trước hành động khác trong quá khứ nhưng để lại dấu hiệu ở quá khứ nên ta chia thì quá khứ hoàn thành tiếp diễn."
        },
        {
          "num": 14,
          "type": "fill",
          "text": "It was a bit discomfort to arrive at their house and found Liz looking so depressed. I think she_____(cry) before I got there.",
          "answer": "had been crying",
          "explanation": "* Căn cứ vào: cách dùng của thì quá khứ hoàn thành tiếp diễn. - Diễn tả hành động xảy ra liên tục kéo dài trước một hành động khác trong quá khứ. - “cô ấy khóc” xảy ra trong quá khứ và xảy ra trước việc “tôi đến đây”. * Dịch nghĩa: Thật là bối rối để đến nhà của họ và thấy Mary đang thất vọng. Tôi nghĩ cô ấy đã khóc rất nhiều trước khi tôi đến đây."
        },
        {
          "num": 15,
          "type": "fill",
          "text": "I_____(learn) Germany for 4 years and then decided to give it up.",
          "answer": "had been learning",
          "explanation": "* Căn cứ vào: cách dùng của thì QKHT tiếp diễn. - Diễn tả hành động hành động xảy ra liên tục kéo dài trước hành động khác trong quá khứ. - Việc “học tiếng Đức” xảy ra trong quá khứ và xảy ra trước “việc từ bỏ”. => chia thì QKHT tiếp diễn. * Dịch nghĩa: Tôi đã tiếng Đức trong vòng bốn năm và sau đó quyết định từ bỏ nó."
        }
      ]
    },
    {
      "name": "Exercise 11",
      "description": "Choose the best word or phrase to complete in the following questions.",
      "questions": [
        {
          "num": 1,
          "type": "choice",
          "text": "She passed her examination because she_____very hard.",
          "options": {
            "A": "studied",
            "B": "was studying",
            "C": "had been studying",
            "D": "studies"
          },
          "answer": "C",
          "explanation": "Dịch: Cô ấy đã vượt qua kì thi bởi vì cô ấy học tập chăm chỉ.\n=> Do học hành chăm chỉ mới thi đỗ. \n( Diễn đạt hành động là nguyên nhân của một điều gì đó trong quá khứ ta dùng thì quá khứ hoàn thành tiếp diễn.)"
        },
        {
          "num": 2,
          "type": "choice",
          "text": "You_____out last night or were you tired?",
          "options": {
            "A": "Did - went",
            "B": "Had - gone",
            "C": "Did - go",
            "D": "Had - been going"
          },
          "answer": "C",
          "explanation": "Dịch: Bạn đã đi đâu tối qua hay bạn mệt?\n- Căn cứ vào “last night” nên động từ chia thì quá khứ đơn"
        },
        {
          "num": 3,
          "type": "choice",
          "text": "This time yesterday I_____tennis with my classmates.",
          "options": {
            "A": "played",
            "B": "was playing",
            "C": "had played",
            "D": "would play"
          },
          "answer": "B",
          "explanation": "Căn cứ vào: “This time / at this time + mốc thời gian quá khứ” => ta chia thì quá khứ tiếp diễn.\u000b- Dịch nghĩa: Thời điểm này ngày hôm qua, tôi đang chơi quần vợt với những người bạn cùng lớp của tôi."
        },
        {
          "num": 4,
          "type": "choice",
          "text": "Nicole_____television a lot when she_____sick last year.",
          "options": {
            "A": "watched - was",
            "B": "had watched - had been",
            "C": "was watching - was",
            "D": "had been watching - was"
          },
          "answer": "A",
          "explanation": "Xét các đáp án => ở đây chỉ dùng các thì quá khứ. \n=> Nội dung câu này chỉ một hành động lặp đi lặp lại trong một giai đoạn nào đó ở quá khứ, nên ta chỉ dùng thì quá khứ đơn cho cả 2 vế.\n=> Không phân định hành động nào xảy ra trước, hành động nào sau nên không dùng các thì hoàn thành. \n=> Không phải 1 hành động đang xảy ra thì hành động khác chen vào, nên ta không dùng thì tiếp diễn. \n=> Chốt lại ta được đáp án A. \nDịch: Năm ngoái trong lúc bệnh, Nicole xem TV rất nhiều."
        },
        {
          "num": 5,
          "type": "choice",
          "text": "Mary_____home when she met Dave.",
          "options": {
            "A": "came",
            "B": "had come",
            "C": "had been coming",
            "D": "was coming"
          },
          "answer": "D",
          "explanation": "Căn cứ vào: mệnh đề trạng ngữ chỉ thời gian.\u000bS + V (quá khứ tiếp diễn) + when + S+ V (quá khứ đơn).\n(Diễn tả một hành động đang xảy ra trong quá khứ thì có hành động khác xen vào).\u000b- Dịch nghĩa: Khi Mary đang về nhà thì cô ấy gặp Dave."
        },
        {
          "num": 6,
          "type": "choice",
          "text": "The doorbell_____while I_____a shower.",
          "options": {
            "A": "was ringing - took",
            "B": "rang - was taking",
            "C": "had rung - took",
            "D": "had been ringing - took"
          },
          "answer": "B",
          "explanation": "Căn cứ vào: mệnh đề trạng ngữ chỉ thời gian.\u000bS + V (quá khứ đơn) + while + S+ V (quá khứ tiếp diễn). \n(Diễn tả một hành động đang xảy ra trong quá khứ thì có hành động khác xen vào).\u000b- Dịch nghĩa: Chuông cửa đã reo lên trong khi tôi đang tắm."
        },
        {
          "num": 7,
          "type": "choice",
          "text": "When I was young, I_____to be a pilot.",
          "options": {
            "A": "wanted",
            "B": "had wanted",
            "C": "would want",
            "D": "wants"
          },
          "answer": "A",
          "explanation": "Dịch: Khi tôi còn trẻ, tôi muốn trở thành phi công.\n=> Kể về một hồi ức chia thì quá khứ đơn"
        },
        {
          "num": 8,
          "type": "choice",
          "text": "The war_____out three years ago.",
          "options": {
            "A": "was breaking",
            "B": "had broken",
            "C": "broke",
            "D": "have been breaking"
          },
          "answer": "C",
          "explanation": "Căn cứ vào: “three years ago” là dấu hiệu nhận biết thì quá khứ đơn.\u000b- Dịch nghĩa: Chiến tranh đã nổ ra ba năm trước."
        },
        {
          "num": 9,
          "type": "choice",
          "text": "When he was young, he_____in the army.",
          "options": {
            "A": "had been serving",
            "B": "serves",
            "C": "have served",
            "D": "served"
          },
          "answer": "D",
          "explanation": "Dịch: Khi anh ấy còn trẻ, anh ấy đã đã phục vụ trong quân đội.\n=> kể về một hồi ức => chia thì quá khứ đơn"
        },
        {
          "num": 10,
          "type": "choice",
          "text": "She often goes to school by bike but yesterday she_____by bus.",
          "options": {
            "A": "travelled",
            "B": "have been travelling",
            "C": "had travelled",
            "D": "travels"
          },
          "answer": "A",
          "explanation": "Căn cứ vào: “yesterday” là dấu hiệu nhận biết thì quá khứ đơn. \n=> Đáp án: A. \nDịch nghĩa: Cô ấy thường đến trường bằng xe đạp nhưng ngày hôm qua cô ấy đi xe buýt."
        },
        {
          "num": 11,
          "type": "choice",
          "text": "He_____a cup of coffee every morning many years ago.",
          "options": {
            "A": "have been drinking",
            "B": "drank",
            "C": "had drunk",
            "D": "was drinking"
          },
          "answer": "B",
          "explanation": "Căn cứ vào: “thời gian + ago” là dấu hiệu nhận biết thì quá khứ đơn. \n=> Loại đáp án A ngay vì nó không liên quan gì đến hiện tại. Đó là thói quen xảy ra và kết thúc hoàn toàn trong quá khứ rồi\n- Không dùng thì quá khứ hoàn thành đứng riêng lẻ một mệnh đề như vậy, nó luôn phải đi kèm với một mệnh đề khác hoặc một mốc thời gian khác trong quá khứ, loại C\n- Không có dấu hiệu cụ thể về thời gian trong quá khứ để chia quá khứ tiếp diễn, loại D\n- Dịch nghĩa: Cách đây nhiều năm trước, anh ấy uống một cốc cà phê mỗi buổi sáng."
        },
        {
          "num": 12,
          "type": "choice",
          "text": "Yesterday she_____to pay me for my helping her but I didn’t accept.",
          "options": {
            "A": "will offer",
            "B": "was offering",
            "C": "had offered",
            "D": "offered"
          },
          "answer": "D",
          "explanation": "Căn cứ vào: “yesterday” là dấu hiệu nhận biết thì quá khứ đơn.\u000b- Dịch nghĩa: Hôm qua cô ấy đề nghị trả tiền cho tôi vì tôi đã giúp cô ấy nhưng tôi đã không chấp nhận."
        },
        {
          "num": 13,
          "type": "choice",
          "text": "There_____a lot of grass in the garden last summer.",
          "options": {
            "A": "had been",
            "B": "were",
            "C": "have been",
            "D": "will be"
          },
          "answer": "B",
          "explanation": "Căn cứ vào: “last summer” là dấu hiệu nhận biết thì quá khứ đơn.\u000b- Dịch nghĩa: Có rất nhiều cỏ ở trong vườn hè năm ngoái."
        },
        {
          "num": 14,
          "type": "choice",
          "text": "It’s time we_____something to help him.",
          "options": {
            "A": "will do",
            "B": "had done",
            "C": "did",
            "D": "was doing"
          },
          "answer": "C",
          "explanation": "Căn cứ vào cấu trúc: It’s time + S + V (quá khứ đơn). (Đã đến lúc ai đó phải làm gì).\u000b- Dịch nghĩa: Đã đến lúc chúng ta làm gì đó để giúp đỡ anh ấy."
        },
        {
          "num": 15,
          "type": "choice",
          "text": "Mr Brown_____in Paris when the Second World War broke out.",
          "options": {
            "A": "lived",
            "B": "was_____living",
            "C": "had lived",
            "D": "will live"
          },
          "answer": "B",
          "explanation": "Dịch: Khi chiến tranh thế giới thứ hai nổ ra, ông Brown đang sống ở Paris. \n=> Diễn tả hành động đang xảy ra thì có hành động khác xen vào. Hành động “sống”xảy ra trước nên ta chia thì quá khứ tiếp diễn."
        },
        {
          "num": 16,
          "type": "choice",
          "text": "I and my mom_____comic at this time last night.",
          "options": {
            "A": "read",
            "B": "had been reading",
            "C": "have read",
            "D": "were reading"
          },
          "answer": "D",
          "explanation": "Căn cứ vào: “at this time last night” là dấu hiệu nhận biết thì quá khứ tiếp diễn.\n- Dịch nghĩa: Vào thời điểm này tối qua tôi và mẹ tôi đang đọc truyện tranh."
        },
        {
          "num": 17,
          "type": "choice",
          "text": "At lO.pm last night, my younger brother_____games online.",
          "options": {
            "A": "had been playing",
            "B": "was playing",
            "C": "will be playing",
            "D": "have been playing"
          },
          "answer": "B",
          "explanation": "Căn cứ vào: “At + giờ + mốc thời gian quá khứ” là dấu hiệu nhận biết thì quá khứ tiếp diễn.\u000b- Dịch nghĩa: Vào lúc 10 giờ tối qua, em trai nhỏ của tôi đang chơi trò chơi điện tử trực tuyến."
        },
        {
          "num": 18,
          "type": "choice",
          "text": "People_____all trees along the streets at this time two years ago.",
          "options": {
            "A": "are planting",
            "B": "will have been planting",
            "C": "were planting",
            "D": "will be planting"
          },
          "answer": "C",
          "explanation": "Căn cứ vào: “at this time two years ago” là dấu hiệu nhận biết thì quá khứ tiếp diễn.\u000b- Dịch nghĩa: Mọi người đã trồng tất cả các cây trên đường phố vào thời điểm này hai năm trước."
        },
        {
          "num": 19,
          "type": "choice",
          "text": "She_____her homework at this time yesterday morning?",
          "options": {
            "A": "Was-doing",
            "B": "Had - been doing",
            "C": "Do-do",
            "D": "Will - be doing"
          },
          "answer": "A",
          "explanation": "Căn cứ vào: dấu hiệu nhận biết thì quá khứ tiếp diễn “at this time yesterday morning”. \n(At this time + mốc thời gian trong quá khứ)\u000b- Dịch nghĩa: Cô ấy đang làm bài tập về nhà thời điểm này sáng ngày hôm qua phải không?"
        },
        {
          "num": 20,
          "type": "choice",
          "text": "They_____dinner when we_____.",
          "options": {
            "A": "had - was coming",
            "B": "had had - came",
            "C": "come - will be coming",
            "D": "were having - came"
          },
          "answer": "D",
          "explanation": "Căn cứ vào: cách phối thì giữa thì quá khứ đơn và quá khứ tiếp diễn: Dùng để diễn tả một hành động đang xảy ra thì có hành động khác xen vào trong quá khứ.\u000b- Dịch nghĩa: Họ đang ăn tối thì chúng tôi đến."
        },
        {
          "num": 21,
          "type": "choice",
          "text": "At 8.am yesterday they_____dinner while we_____TV.",
          "options": {
            "A": "will be having - will be watching",
            "B": "were having - were watching",
            "C": "are having - are watching",
            "D": "will have had - will have watched"
          },
          "answer": "B",
          "explanation": "Căn cứ vào: dấu hiệu nhận biết thì quá khứ tiếp diễn.\u000bAt + giờ + mốc thời gian quá khứ.\u000b- Dịch nghĩa: Vào lúc tám giờ ngày hôm qua, trong khi chúng tôi đang xem TV thì họ đang ăn tối."
        },
        {
          "num": 22,
          "type": "choice",
          "text": "When I went out, the sun_____.",
          "options": {
            "A": "will be shining",
            "B": "is shining",
            "C": "was shining",
            "D": "had been shining"
          },
          "answer": "C",
          "explanation": "Dịch: Khi tôi ra ngoài, trời đang bừng nắng.\nGiái thích:\n- hành động mặt trời đang bừng nắng xảy ra trước hành động tôi ra ngoài. Vào lúc tôi ra ngoài thì mặt trời vẫn còn đang bừng nắng => chia thì quá khứ tiếp diễn\nĐáp án C"
        },
        {
          "num": 23,
          "type": "choice",
          "text": "We_____to the station when it_____to rain.",
          "options": {
            "A": "were walking - began",
            "B": "had been walking - began",
            "C": "have been walking - begins",
            "D": "will be walking - begin"
          },
          "answer": "A",
          "explanation": "Căn cứ vào: cách dùng của thì quá khứ tiếp diễn: Diễn đạt hành động đang xảy ra thì có hành động khác xen vào.\u000b=> Hành động “đi bộ” đang diễn ra => chia quá khứ tiếp diễn\n=> Hành động “mưa” xen vào => chia quá khứ đơn\u000b- Dịch nghĩa: Chúng tôi đang đi bộ đến nhà ga thì trời mưa."
        },
        {
          "num": 24,
          "type": "choice",
          "text": "The servant dropped two cups while she_____up last night.",
          "options": {
            "A": "is washing",
            "B": "had been washing",
            "C": "have been washing",
            "D": "was washing"
          },
          "answer": "D",
          "explanation": "Căn cứ vào: cách dùng của thì quá khứ tiếp diễn: Diễn đạt hành động đang xảy ra thì có hành động khác xen vào.\u000b- Dịch nghĩa: Người phục vụ đã làm rơi hai chiếc cốc trong khi cô ấy đang rửa bát tối qua."
        },
        {
          "num": 25,
          "type": "choice",
          "text": "Almost everybody_____by the time we arrived.",
          "options": {
            "A": "have been leaving",
            "B": "had left",
            "C": "was leaving",
            "D": "have left"
          },
          "answer": "B",
          "explanation": "Căn cứ: mệnh đề trạng ngữ chỉ thời gian. \nBy the time + S + V (quá khứ đơn), S + V (quá khứ hoàn thành).\n- Dịch nghĩa: Hầu hết mọi người đã rời đi vào vào thời điểm chúng tôi đến."
        },
        {
          "num": 26,
          "type": "choice",
          "text": "The secretary_____until she_____her work.",
          "options": {
            "A": "hadn’t left - finish",
            "B": "don’t leave - had finished",
            "C": "didn’t leave - had finished",
            "D": "wasn’t leaving - finished"
          },
          "answer": "C",
          "explanation": "Dịch nghĩa: Thư kí sẽ không rời đi cho đến khi cô ấy hoàn thành xong công việc.\n- Việc cô ấy “hoàn thành công” việc xảy ra trước. => cô ấy “rời đi” xảy ra sau. \n=> “hoàn thành” chia quá khứ hoàn thành. \n=> “rời đi” chia thì quá khứ đơn."
        },
        {
          "num": 27,
          "type": "choice",
          "text": "The teacher asked the boy why he_____his homework.",
          "options": {
            "A": "have done",
            "B": "did",
            "C": "have been doing",
            "D": "hadn’t done"
          },
          "answer": "D",
          "explanation": "* Dịch nghĩa: Giáo viên đã hỏi tại sao anh ấy chưa hoàn thành bài tập về nhà.\n-Việc anh ấy chưa hoàn thành bài tập về nhà xảy ra trước hành động “giáo viên hỏi”.\n=> chia thì quá khứ hoàn thành."
        },
        {
          "num": 28,
          "type": "choice",
          "text": "She_____the letter when she_____she_____it to the wrong address.",
          "options": {
            "A": "posted - had realized - sent",
            "B": "had posted - realized - had sent",
            "C": "was posting - realized - had sent",
            "D": "have posted - had realized - had sent"
          },
          "answer": "B",
          "explanation": "Dịch: Cô ấy gửi thư đi rồi thì cô ấy mới nhận ra là mình đã gửi nhầm địa chỉ. \n=> Có 3 hành động: gửi thư - nhận ra - gửi nhầm. Trong đó hành động nhận ra xảy ra sau nên chia quá khứ đơn, hành động gửi thử và gửi nhầm địa chỉ xảy ra trước nên chia quá khứ hoàn thành."
        },
        {
          "num": 29,
          "type": "choice",
          "text": "Hardly_____a mile when it had a flat tyre.",
          "options": {
            "A": "had the car gone",
            "B": "did the car go",
            "C": "had the car go",
            "D": "do the car go"
          },
          "answer": "A",
          "explanation": "Căn cứ vào: cấu trúc đảo ngữ: Hardly + had + S + V (quá khứ phân từ) when + S + V (quá khứ đơn).\u000b- Dịch nghĩa: Xe ô tô mới đi được một dặm thì nó bị bục lốp."
        },
        {
          "num": 30,
          "type": "choice",
          "text": "The weather_____far worse than we_____.",
          "options": {
            "A": "is - have expected",
            "B": "was - was expected",
            "C": "was - have been expecting",
            "D": "was - had expected"
          },
          "answer": "D",
          "explanation": "Dịch nghĩa: Thời tiết tệ hơn nhiều so với những gì chúng tôi đã dự tính.\n- Việc “dự đoán” xảy ra trước. => chia thì quá khứ hoàn thành.\n- “Thời tiết xấu hơn” dự đoán xảy ra sau. => chia thì quá khứ đơn."
        },
        {
          "num": 31,
          "type": "choice",
          "text": "They_____for five years when they finally had a child.",
          "options": {
            "A": "will have been married",
            "B": "had been married",
            "C": "have married",
            "D": "will be marrying"
          },
          "answer": "B",
          "explanation": "Dịch: Khi họ có con, họ đã cưới nhau được 5 năm rồi.\n=> Việc lấy nhau xảy ra trước hành động có con => trước của quá khứ ta chia quá khứ hoàn thành. \n*Note: Be married = get married (a): kết hôn, cưới"
        },
        {
          "num": 32,
          "type": "choice",
          "text": "When she_____her work, she_____to the cinema.",
          "options": {
            "A": "finished - had gone",
            "B": "was finishing - had been going",
            "C": "had finished - went",
            "D": "had been finishing - was going"
          },
          "answer": "C",
          "explanation": "* Dịch nghĩa: Khi cô ấy hoàn thành xong công việc, cô ấy đã đi đến rạp chiếu phim.\n- Hoàn thành công việc xảy ra trước. => chia thì quá khứ hoàn thành.\n- Đến rạp chiếu phim xảy ra sau. => chia thì quá khứ đơn."
        },
        {
          "num": 33,
          "type": "choice",
          "text": "At the time of our first meeting there was a considerable difference between me and him; he_____articles in magazines for over five years while I was practically unknown.",
          "options": {
            "A": "had been publishing",
            "B": "was publishing",
            "C": "has been publishing",
            "D": "published"
          },
          "answer": "A",
          "explanation": "Dịch nghĩa: Vào thời điểm cuộc gặp đầu tiên của chúng tôi, có một sự khác biệt lớn giữa tôi và anh ấy. Anh ấy đã có vài bài báo được đăng trên các tạp chí trong khoảng 5 năm trong khi tôi gần như chả có ai biết đến. \n=> Anh ấy đã có bài được đăng báo trong suốt 5 năm và từ trước khi chúng tôi gặp nhau. \n=> Hành động diễn ra trước thời điểm quá khứ và nhấn mạnh tính tiếp diễn nên ta chia thì quá khứ hoàn thành tiếp diễn."
        },
        {
          "num": 34,
          "type": "choice",
          "text": "The house_____to the ground by the time the firemen_____",
          "options": {
            "A": "burned - had arrived",
            "B": "had burned - arrived",
            "C": "was burning – arrived",
            "D": "burned - was arriving"
          },
          "answer": "B",
          "explanation": "Dịch nghĩa: Vào thời điểm lính cứu hỏa đến, ngôi nhà đã cháy lan ra mặt đất.\n=> Việc “ngôi nhà cháy lan ra mặt đất” xảy ra trước. => chia thì quá khứ hoàn thành.\n=> “Lính cứu hỏa đến” xảy ra sau. => chia thì quá khứ đơn.\nCấu trúc:\n                               By the time + S + V(quá khứ đơn), S + V (quá khứ hoàn thành)"
        },
        {
          "num": 35,
          "type": "choice",
          "text": "I_____the accident when I was waiting for the taxi.",
          "options": {
            "A": "saw",
            "B": "was seeing",
            "C": "had been seeing",
            "D": "have seen"
          },
          "answer": "A",
          "explanation": "* Căn cứ vào:\n- Khi diễn tả một hành động đang xảy ra trong quá khứ thì có một hành động khác xen vào.\n=> Hành động xen vào chia thì quá khứ đơn. \n=> Việc “nhìn thấy” là hành động xen vào nên chia thì quá khứ đơn. \u000b* Dịch nghĩa: Tôi đã nhìn thấy một vụ tai nạn khi tôi đang chờ xe taxi."
        },
        {
          "num": 36,
          "type": "choice",
          "text": "I agree that while the soup was OK, the meat was too dry - we_____ it about 20 minutes too long.",
          "options": {
            "A": "had roasted",
            "B": "roast",
            "C": "had roast",
            "D": "have been roasting"
          },
          "answer": "A",
          "explanation": "Căn cứ vào “too long” - quá lâu (một quá trình) nên động từ trong mệnh đề này chia ở thì hoàn thành. Từ đó, ta loại phương án B. \n- Căn cứ vào động từ ở mệnh đề trước “was” chia thì quá khứ đơn nên vế sau chia thì quá khứ hoàn thành (theo quy tắc về sự phối thì.)\nTạm dịch: Mình đồng ý là trong khi món súp ngon thì món thịt lại quá khô - chúng ta đã nướng nó trong khoảng 20 phút liền."
        },
        {
          "num": 37,
          "type": "choice",
          "text": "At this time last night while people were talking to each other, he_____his book.",
          "options": {
            "A": "was reading",
            "B": "is reading",
            "C": "have read",
            "D": "reads"
          },
          "answer": "A",
          "explanation": "* Căn cứ vào:\n- at this time last night: là dấu hiệu nhận biết thì quá khứ tiếp diễn.\n* Dịch nghĩa: Vào thời điểm này tối qua trong khi mọi người đang nói chuyện với nhau, anh ấy đang đọc sách."
        },
        {
          "num": 38,
          "type": "choice",
          "text": "While we_____in the park, Mary fell over.",
          "options": {
            "A": "ran",
            "B": "are running",
            "C": "had been running",
            "D": "were running"
          },
          "answer": "D",
          "explanation": "* Căn cứ cách dùng của thì quá khứ tiếp diễn:\n- Diễn tả hành động đang xảy ra thì có hành động khác xen vào.\n* Dịch nghĩa: Trong khi chúng tôi đang chạy ở công viên, Mary đã bị ngã.\n=> hành động “chạy” chia thì quá khứ tiếp diễn."
        },
        {
          "num": 39,
          "type": "choice",
          "text": "_____I was listening to music, I heard the doorbell.",
          "options": {
            "A": "When",
            "B": "While",
            "C": "If",
            "D": "Because"
          },
          "answer": "A",
          "explanation": "Dịch: Khi tôi đang nghe nhạc, tôi nghe thấy tiếng chuông cửa.\nA. When: khi\nB. Why: tại sao\nC. If: nếu\nD. Because: bởi vì"
        },
        {
          "num": 40,
          "type": "choice",
          "text": "How long_____English before she went to London?",
          "options": {
            "A": "did she learn",
            "B": "had she been learning",
            "C": "have she learnt",
            "D": "was she learning"
          },
          "answer": "B",
          "explanation": "* Dịch nghĩa: Trước khi cô ấy đến London, cô ấy đã học tiếng anh trong bao lâu?\n=> Nhấn mạnh thời gian liên tục cô ấy học Tiếng Anh và xảy ra trước việc “cô ấy đến London”.\n=> Ta chia thì quá khứ hoàn thành tiếp diễn"
        },
        {
          "num": 41,
          "type": "choice",
          "text": "They_____at the station for 90 minutes when the train finally arrived.",
          "options": {
            "A": "were waiting",
            "B": "will be learning",
            "C": "had been waiting",
            "D": "are learning"
          },
          "answer": "C",
          "explanation": "* Căn cứ cách dùng của thì QKHT tiếp diễn:\n- Nhấn mạnh một hành động xảy ra liên tục kéo dài trước hành động khác trong một hành động khác trong quá khứ.\n- “for 90 minutes” nhấn mạnh “việc họ phải chờ”, việc “chờ” diễn ra trước việc “tàu đến”.\n* Dịch nghĩa: Cuối cùng tàu  đã đến họ đã chờ 90 phút ở nhà ga."
        },
        {
          "num": 42,
          "type": "choice",
          "text": "We_____for her ring for two hours and then we found it in the bathroom.",
          "options": {
            "A": "had been looking",
            "B": "were looking",
            "C": "will be learning",
            "D": "have been learning"
          },
          "answer": "A",
          "explanation": "Dịch: Chúng tôi đã tìm chiếc nhẫn của cô ấy trong hai giờ và sau đó chúng tôi đã tìm thấy nó ở trong phòng tắm.\n+ hành động \" tìm nhẫn của cô ấy\" xảy ra trong quá khứ, “tìm thấy nó ở phòng tắm” xảy ra sau.\n+ “for two hours” nhấn mạnh tính liên tục của hành động \" tìm nhẫn của cô ấy\", nó diễn ra liên tục trong hai giờ.\n=> Chia thì quá khứ hoàn thành tiếp diễn."
        },
        {
          "num": 43,
          "type": "choice",
          "text": "Frank Sinatra caught the flu because he_____in the rain too long.",
          "options": {
            "A": "was singing",
            "B": "will be learning",
            "C": "is singing",
            "D": "had been singing"
          },
          "answer": "D",
          "explanation": "Dịch: Frank Sinatra đã bị cúm bởi vì anh ấy đã hát trong trời mưa quá lâu.\n+ \" hát\" là hành động xảy ra trong quá khứ và đã chấm dứt, \" hát\" xảy ra trước việc “bị cúm”.\n+ “too long”  nhấn mạnh đến tính liên tục của việc “hát” xảy trong trong khoảng thời gian “quá lâu”. \n=> Chia thì quá khứ hoàn thành tiếp diễn."
        },
        {
          "num": 44,
          "type": "choice",
          "text": "When police were investigating the road accident, they discovered that the driver_____two road accidents before.",
          "options": {
            "A": "had been involved in",
            "B": "had been being involved in",
            "C": "will be involving in",
            "D": "will have involved in"
          },
          "answer": "A",
          "explanation": "* Căn cứ vào cách dùng của thì quá khứ hoàn thành:\u000b- Nhấn mạnh hành động xảy ra trước hành động khác trong quá khứ.\u000b- Nhấn mạnh “Lái xe có liên quan đến hai vụ tai nạn trước đó”.\u000b* Dịch nghĩa: Khi cảnh sát đang điều tra vụ tai nạn giao thông, họ đã phát hiện ra rằng lái xe có liên quan đến hai vụ tai nạn giao thông trước đó."
        },
        {
          "num": 45,
          "type": "choice",
          "text": "They_____anyone while they were walking home because it was raining.",
          "options": {
            "A": "weren’t seeing",
            "B": "hadn’t see",
            "C": "didn’t see",
            "D": "weren’t seen"
          },
          "answer": "C",
          "explanation": "* Căn cứ vào cách dùng của thì quá khứ đơn: diễn tả hành động xảy ra trong quá khứ. \n- “Họ đã không nhìn thấy” => chia thì quá khứ đơn. \n* Dịch nghĩa: Họ đã không nhìn thấy ai trong khi họ đang đi về nhà bởi vì trời mưa."
        },
        {
          "num": 46,
          "type": "choice",
          "text": "Although at that time my knowledge of German was very poor, I _____most of what they said.",
          "options": {
            "A": "understood",
            "B": "have understood",
            "C": "managed to understand",
            "D": "didn’t understand"
          },
          "answer": "C",
          "explanation": "Dịch: Mặc dù ở thời điểm đó vốn kiến thức về tiếng Đức của tôi rất kém, nhưng tôi vẫn cố gắng hiểu được hầu hết những gì họ nói.\nTa có cấu trúc: manage to do st: xoay sở để làm gì\nLưu ý: \nXét thì động từ thì ta thấy cả A và C đều đúng. Nhưng xét về nghĩa và ngữ cảnh của câu thì ta chọn C."
        },
        {
          "num": 47,
          "type": "choice",
          "text": "We watched the film The Godfather last night. We had seen the film about 3 times before but we watched it again because John_____it.",
          "options": {
            "A": "had been seeing",
            "B": "had never seen",
            "C": "have never seen",
            "D": "have been eating"
          },
          "answer": "B",
          "explanation": "Dịch nghĩa: Chúng tôi đã xem bộ phim The Godfather tối qua. Chúng tôi đã xem bộ phim đó ba lần trước đây nhưng chúng tôi vẫn xem lại nó một lần nữa bởi vì Tom chưa bao giờ xem nó.\n=> Hành động chưa xem bao giờ của John là tính đến thời điểm tối qua nên chia thành thì quá khứ hoàn thành. Nếu chia hiện tại hoàn thành thì đồng nghĩa John đã xem một lần tối qua rồi chứ không phải chưa xem bao giờ => Trái với giả thiết"
        },
        {
          "num": 48,
          "type": "choice",
          "text": "We_____for nearly 100 kilometres before we finally found a service station we could stop at.",
          "options": {
            "A": "had driven",
            "B": "have been driving",
            "C": "had been driving",
            "D": "have driven"
          },
          "answer": "C",
          "explanation": "Căn cứ vào: “cách dùng của thì quá khứ hoàn thành”: Diễn tả một hành động xảy ra kéo dài trước một hành động khác trong quá khứ.\n=> Khi muốn nhấn mạnh tính liên tục (quá trình) của hành động trong ngữ cảnh đó, ta dùng thì quá khứ hoàn thành tiếp diễn:\u000b+ đã lái xe gần 100 km (hành động xảy ra trước và kéo dài liên tục)\u000b+ tìm một trạm xăng để dừng lại (hành động xảy ra sau).\u000b=> Đáp án A không sai nhưng đáp án C mới là phương án tối ưu nhất.\u000b- Dịch nghĩa: Chúng tôi đã lái xe gần 100 km trước khi chúng tôi tìm thấy một trạm xăng chúng tôi có thể dừng lại."
        },
        {
          "num": 49,
          "type": "choice",
          "text": "I_____a student in Moloxop School in 1998.",
          "options": {
            "A": "was",
            "B": "were",
            "C": "to be",
            "D": "to was"
          },
          "answer": "A",
          "explanation": "Căn cứ vào: “in + mốc thời gian trong quá khứ” => chia thì quá khứ đơn. \n- Dịch: Vào năm 1998 tôi là học sinh của trường Monoxop."
        },
        {
          "num": 50,
          "type": "choice",
          "text": "When I got home I realised that while I_____someone had stolen my wallet.",
          "options": {
            "A": "had walked",
            "B": "have been walking",
            "C": "have walked",
            "D": "had been walking"
          },
          "answer": "D",
          "explanation": "Dịch nghĩa: Khi tôi về nhà, tôi nhận ra trong khi tôi đi bộ thì có ai đó đã lấy trộm ví của tôi. \n=> Việc đi bộ và bị mất trộm ví xảy ra trước hành động nhận ra nên chia quá khứ hoàn thành. Việc đi bộ là hành động tiếp diễn nên ta dùng quá khứ hoàn thành tiếp diễn để nhấn mạnh tính tiếp diễn."
        }
      ]
    },
    {
      "name": "Exercise 12",
      "description": "Mark the letter A, B, C or D to indicate the correct answer to each of the following questions.",
      "questions": [
        {
          "num": 1,
          "type": "choice",
          "text": "We_____to the hospital to visit Mike when he_____to say that he was fine.",
          "options": {
            "A": "were driving - was calling",
            "B": "drove - called",
            "C": "were driving - called",
            "D": "drove - was calling"
          },
          "answer": "C",
          "explanation": "Dịch nghĩa: Chúng tôi đang đi đến bệnh viện để thăm Mike thì anh ấy gọi đến để nói rằng anh ấy vẫn ổn.\n+ “đang đi đến bệnh viện” là hành động đang xảy => chia quá khứ tiếp diễn.\n+  “gọi đến” là hành động xen vào  => chia thì quá khứ đơn."
        },
        {
          "num": 2,
          "type": "choice",
          "text": "What_____to you on Sunday night?",
          "options": {
            "A": "happen",
            "B": "happened",
            "C": "was happening",
            "D": "would happen"
          },
          "answer": "B",
          "explanation": "Dịch nghĩa: Chuyện gì đã xảy ra với bạn vào tối chủ nhật?\n+ hành động xảy ra và chấm dứt trong quá khứ => chia thì quá khứ đơn."
        },
        {
          "num": 3,
          "type": "choice",
          "text": "Last night, we_____for you for ages but you never_____up.",
          "options": {
            "A": "waited - showed",
            "B": "would wait - showed",
            "C": "were waiting - were showing",
            "D": "waited - was showing"
          },
          "answer": "A",
          "explanation": "=> Key: A. waited – showed\u000b=> Vì: do cách dùng của thì quá khứ đơn: diễn tả một sự việc đã diễn ra và kết thúc trong quá khứ\u000b=> Dịch: Tối qua chúng tôi đã đợi bạn rất lâu nhưng bạn không đến."
        },
        {
          "num": 4,
          "type": "choice",
          "text": "We_____our quality time when the unexpected guest_____.",
          "options": {
            "A": "had - came",
            "B": "were having - came",
            "C": "had been having - came",
            "D": "have had - would have come"
          },
          "answer": "B",
          "explanation": "=> Key: B. were having – came\u000b=> Vì: diễn tả một hành động đang diễn ra thì một hành động khác xen vào\u000b=> Dịch: Chúng tôi đang có thời gian tuyệt vời với nhau thì vị khách không mời mà đến xuất hiện."
        },
        {
          "num": 5,
          "type": "choice",
          "text": "Since they_____us they_____to visit us last Sunday, we_____forward to the day.",
          "options": {
            "A": "were telling - came - looked",
            "B": "would tell - would visit - would look",
            "C": "told - would come - were looking",
            "D": "tell - are coming - will look"
          },
          "answer": "C",
          "explanation": "Dịch nghĩa: Vì chủ nhật tuần trước họ bảo là họ sẽ đến thăm chúng tôi nên chúng tôi đã ngóng chờ ngày hôm đó. \n- Căn cứ vào trạng từ thời gian “last sunday” nên động từ “tell” phải chia về quá khứ đơn. Xét các đáp án chỉ có đáp án C phù hợp."
        },
        {
          "num": 6,
          "type": "choice",
          "text": "I_____out last night but at the last minute I_____that I had a quiz this morning",
          "options": {
            "A": "was going - realized",
            "B": "went - realized",
            "C": "had gone - would realize",
            "D": "would go — have realized"
          },
          "answer": "A",
          "explanation": "=> Dịch: Tối qua tôi đang định ra ngoài nhưng vào phút cuối tôi nhận ra rằng mình có một bài kiểm tra sáng nay.\nGiải thích:  \n- căn cứ vào trạng từ last night nên động từ trong câu này phải chia ở thì quá khứ đơn. Từ đó, ta loại C,D.\n- thì tiếp diễn có thể dùng để diễn tả dự định\n=> Đáp án A"
        },
        {
          "num": 7,
          "type": "choice",
          "text": "She hasn't paid as much attention to her children as she_____ since she_____working.",
          "options": {
            "A": "does - starts",
            "B": "did - started",
            "C": "was doing - was starting",
            "D": "has done - would start"
          },
          "answer": "B",
          "explanation": "Dịch nghĩa: Cô ấy đã không chú ý nhiều đến bọn trẻ của mình như trước kể từ khi cô ấy bắt đầu đi làm. \n+ Ta có cấu trúc: S + V(hiện tại hoàn thành) + since + S + V(quá khứ đơn). \n=> Vế sau “since” chia thì quá khứ đơn\n+ Vị trí thứ nhất cần động từ để mang nghĩa “cô ấy từng làm”=> động từ phải chia ở quá khứ đơn; vì đang so sánh rằng “bây giờ không chú ý nhiều đến con cái như trước đây”. Khi không muốn nhắc lại cụm “pay attention to her children” nên họ đã dùng trợ động từ để thay thế là “did”."
        },
        {
          "num": 8,
          "type": "choice",
          "text": "My brother_____at the road when he_____into a hole.",
          "options": {
            "A": "wasn't looking - was falling",
            "B": "didn't look - has fallen",
            "C": "wasn't looking - fell",
            "D": "won't look - fall"
          },
          "answer": "C",
          "explanation": "=> Key: C. wasn’t looking – fell\u000b=> Vì: một hành động đang diễn ra thì hành động khác xen vào\u000b=> Dịch: Khi anh trai tôi đang không nhìn đường thì anh ấy rơi xuống một cái hố."
        },
        {
          "num": 9,
          "type": "choice",
          "text": "Magellan_____the first European who_____through the strait.",
          "options": {
            "A": "was - was sailing",
            "B": "was being - was sailing",
            "C": "had been - sailed",
            "D": "was - sailed"
          },
          "answer": "D",
          "explanation": "=> Key: D. was – sailed\u000b=> Vì: theo cách dùng của thì quá khứ đơn: diễn tả một sự việc đã diễn ra và kết thúc trong quá khứ\u000b=> Dịch: Magellan là người châu Âu đầu tiên đi thuyền qua eo biển"
        },
        {
          "num": 10,
          "type": "choice",
          "text": "The first self-sufficient village in Britain_____the Norman's idea. They were some strange invaders who_____to change the country in a better way.",
          "options": {
            "A": "was - hoped",
            "B": "is - have hoped",
            "C": "have been - were hoping",
            "D": "was being - had hoped"
          },
          "answer": "A",
          "explanation": "=> Key: A. was – hoped\u000b=> Vì: theo cách dùng của thì quá khứ đơn: diễn tả một sự việc đã diễn ra và kết thúc trong quá khứ\u000b=> Dịch: Ngôi làng độc lập đầu tiên ở Anh là ý tưởng của người Norman. Họ là những kẻ xâm lược kỳ lạ đã hy vọng thay đổi đất nước theo cách tốt hơn."
        },
        {
          "num": 11,
          "type": "choice",
          "text": "Linda only_____the film after she_____the book.",
          "options": {
            "A": "understood - read",
            "B": "understood - had read",
            "C": "had understood - read",
            "D": "understood - was reading"
          },
          "answer": "B",
          "explanation": "=> Vì: theo cách dùng của thì quá khứ đơn: diễn tả một sự việc đã diễn ra và kết thúc trong quá khứ và quá khứ hoàn thành để diển tả một sự việc đã xảy ra trước một sự việc khác trong quá khứ\u000b=> Dịch: Linda chỉ hiểu bộ phim sau khi cô đọc cuốn sách."
        },
        {
          "num": 12,
          "type": "choice",
          "text": "_____you ever_____on TV before you_____in this reality show?",
          "options": {
            "A": "Had ... appeared - took part",
            "B": "Have ... appeared - took part",
            "C": "Did ... appear - had taken part",
            "D": "Would ... appear - took part"
          },
          "answer": "A",
          "explanation": "=> Key: A. Had … appeared – took part\u000b=> Vì: quá khứ hoàn thành để diển tả một sự việc đã xảy ra trước một sự việc trong quá khứ và theo cách dùng của thì quá khứ đơn: diễn tả một sự việc đã diễn ra và kết thúc trong quá khứ\u000b=> Dịch: Bạn đã từng xuất hiện trên TV trước khi bạn tham gia chương trình thực tế này chưa?"
        },
        {
          "num": 13,
          "type": "choice",
          "text": "I wasn't sure how Belinda would react because I_____her long.",
          "options": {
            "A": "didn't know",
            "B": "wasn't knowing",
            "C": "hadn't been knowing",
            "D": "hadn't known"
          },
          "answer": "D",
          "explanation": "Tạm dịch: Tôi không chắc là Belinda sẽ phản ứng như thế nào bởi vì tôi đã không hay biết gì về cô ấy từ rất lâu rồi. \n=> Căn cứ vào “long” nên mệnh đề sau chia thì hiện tại hoàn thành. Tuy nhiên, động từ ở mệnh đề trước chia thì quá khứ đơn nên động từ ở mệnh đề sau phải lùi một thì => thì quá khứ hoàn thành"
        },
        {
          "num": 14,
          "type": "choice",
          "text": "I wanted to say goodbye to Jerry, but he_____.",
          "options": {
            "A": "was already left",
            "B": "already left",
            "C": "had already been leaving",
            "D": "had already left"
          },
          "answer": "D",
          "explanation": "=> Key: D. had already left\u000b=> Vì: dùng từ hiện tại do ở đây việc anh ta rời đi đã xảy ra trước việc nói tạm biệt\u000b=> Dịch: Tôi muốn nói lời tạm biệt với Jerry, nhưng anh ấy đã rời đi rồi"
        },
        {
          "num": 15,
          "type": "choice",
          "text": "When we_____to the airport, I realized that I_____my passport at home.",
          "options": {
            "A": "got - had left",
            "B": "got - was left",
            "C": "got - left",
            "D": "had got - had left"
          },
          "answer": "A",
          "explanation": "=> Vì: việc quên hộ chiếu diễn ra trước việc đi tới sân bay, nên ta chia thì quá khứ đơn cho hành động “đến sân bay” và quá khứ hoàn thành cho hành động “quên hộ chiếu” - vì dùng để nó diễn tả một hành động xảy ra trước một hành động khác trong quá khứ.\u000b=> Dịch: Khi chúng tôi tới sân bay, tôi nhận ra là tôi đã quên hộ chiếu ở nhà."
        },
        {
          "num": 16,
          "type": "choice",
          "text": "He_____the umbrella in his right hand trying to keep his balance.",
          "options": {
            "A": "hold",
            "B": "held",
            "C": "has been holding",
            "D": "has held"
          },
          "answer": "B",
          "explanation": "=> Vì: diễn tả một sự việc đã diễn ra và kết thúc trong quá khứ vì câu có hàm nghĩa thiên về cau kể => quá khứ đơn\u000b=> Dịch: Anh cầm chiếc ô trong tay phải cố giữ thăng bằng."
        },
        {
          "num": 17,
          "type": "choice",
          "text": "When I met Walters about two years before his death he didn't seem satisfied. He_____no major book since he settled in Uganda.",
          "options": {
            "A": "has published",
            "B": "could have published",
            "C": "published",
            "D": "had published"
          },
          "answer": "D",
          "explanation": "Dịch nghĩa: Khi tôi gặp Walters khoảng hai năm trước khi ông ấy qua đời, ông ấy có vẻ không hài lòng. Ông đã không xuất bản cuốn sách lớn nào kể từ khi ông ấy định cư ở Uganda.\u000bTa có cấu trúc: Trước since chia hiện tại hoàn thành sau since chia quá khứ đơn. Tuy nhiên, căn cứ vào các động từ \"met“, ”didn’t seem\" và quy tắc về sự phối thì nên ta chia động từ trong vị trí trống ở thì quá khứ hoàn thành."
        },
        {
          "num": 18,
          "type": "choice",
          "text": "Throughout the campaign we_____our candidate's photographs on the walls of public buildings, hoping to attract women's votes.",
          "options": {
            "A": "have been hanging",
            "B": "hanged",
            "C": "hung",
            "D": "have hung"
          },
          "answer": "C",
          "explanation": "Dịch: Trong suốt chiến dịch đó, chúng tôi đã treo các bức ảnh của ứng cử viên của chúng tôi trên tường của các tòa nhà công cộng, với hy vọng thu hút phiếu bầu của phụ nữ. \n=> Hành động đã xảy ra và đã kết thúc trong quá khứ ta chia thì quá khứ đơn. Mặc dù không có thời gian hay dấu hiệu thời gian cụ thể, nhưng căn cứ vào ngữ nghĩa câu, có thể thấy đó là một câu kể, nên tốt nhất vẫn hiểu nó là hành động đã diễn ra và kết thúc trong quá khứ thay vì ở thì hiện tại."
        },
        {
          "num": 19,
          "type": "choice",
          "text": "Many of the people who attended Major Gordon's funeral_____him for many years.",
          "options": {
            "A": "didn't see",
            "B": "wouldn't see",
            "C": "haven't seen",
            "D": "hadn't seen"
          },
          "answer": "D",
          "explanation": "Dịch nghĩa: Nhiều người đã tham dự đám tang của Thiếu tá Gordon đã không gặp ông trong nhiều năm.\u000b+ sự việc “không gặp Thiếu Tá” đã xảy ra trước việc “tham dự đám tang” => chia thì quá khứ hoàn thành."
        },
        {
          "num": 20,
          "type": "choice",
          "text": "Seeing Peter's handwriting on the envelope, she_____the letter without reading it. She has not mentioned it ever since.",
          "options": {
            "A": "was tearing",
            "B": "tore",
            "C": "had tom",
            "D": "has tom"
          },
          "answer": "B",
          "explanation": "Dịch nghĩa: Nhìn thấy chữ viết tay của Peter trên phong bì, cô xé đã lá thư mà không đọc nó. Cô đã không đề cập đến nó kể từ đó.\u000b- Giải thích: Nhìn thấy chữ viết tay của Peter là xé thư ngay => hành động xảy ra nối tiếp nhau trong quá khứ => chia thì quá khứ đơn."
        },
        {
          "num": 21,
          "type": "choice",
          "text": "We were both very excited about the visit, as we_____each other for ages.",
          "options": {
            "A": "never saw",
            "B": "didn't see",
            "C": "hadn't seen",
            "D": "haven't seen"
          },
          "answer": "C",
          "explanation": "Dịch nghĩa: Cả hai chúng tôi đều rất hào hứng về chuyến viếng thăm, vì chúng tôi đã không gặp nhau lâu lắm rồi.\u000b+ “không gặp trong nhiều năm” là hành động xảy ra trước => chia thì quá khứ hoàn thành."
        },
        {
          "num": 22,
          "type": "choice",
          "text": "What made you think he_____in the Royal Air Force?",
          "options": {
            "A": "must have to be",
            "B": "had been",
            "C": "was being",
            "D": "had had to be"
          },
          "answer": "B",
          "explanation": "Căn cứ vào cách sử dụng của thì quá khứ hoàn thành: diễn tả hành động xảy ra trước hành động khác trong quá khứ.\u000b- Dịch nghĩa: Điều gì khiến bạn nghĩ rằng anh ấy đã ở trong Không quân Hoàng gia?\u000b+ Hành động “ở” xảy ra trước => chia thì quá khứ hoàn thành."
        },
        {
          "num": 23,
          "type": "choice",
          "text": "Without turning my head in the direction of the gate I_____a small object just under the fence.",
          "options": {
            "A": "spotted",
            "B": "had spotted",
            "C": "have spotted",
            "D": "was spotted"
          },
          "answer": "A",
          "explanation": "Dịch nghĩa: Tôi phát hiện ra một vật nhỏ ngay dưới hàng rào mà không quay đầu mình về hướng cổng.\u000bGiai thích: \n- Căn cứ theo ngữ cảnh của câu => câu chia ở thể chủ động => D sai\n- Hành động “phát hiện một vật nhỏ” xảy ra và đã kết thúc trong quá khứ => chia ở thì quá khứ đơn"
        },
        {
          "num": 24,
          "type": "choice",
          "text": "With just one exception, the report says, each of the trees that was cut down_____very expensive treatment for periods of up to ten years.",
          "options": {
            "A": "had to be undergone",
            "B": "was undergone",
            "C": "has undergone",
            "D": "had undergone"
          },
          "answer": "D",
          "explanation": "Dịch nghĩa: Chỉ có một ngoại lệ, báo cáo cho biết, mỗi cây bị chặt hạ đã trải qua quá trình chăm sóc rất tốn kém trong thời gian lên tới mười năm.\n=> Vì hành động \"bị chặt\" chia quá khứ đơn => Việc “trải qua quá trình chăm sóc” diễn ra trước hành động “bị chặt” => hành động \"trải qua quá trình chăm sóc\" phải chia thì quá khứ hoàn thành."
        },
        {
          "num": 25,
          "type": "choice",
          "text": "They_____married for two years or so when Roy enployed a very attractive Indian secretary in his Glasgow office.",
          "options": {
            "A": "only have been",
            "B": "were only",
            "C": "have only been",
            "D": "had only been"
          },
          "answer": "D",
          "explanation": "Dịch nghĩa: Họ chỉ mới kết hôn được hai năm hoặc lâu hơn thì Roy tuyển dụng một thư ký Ấn Độ rất hấp dẫn trong văn phòng tại thành phố Glasgow của ông.\u000b+ “việc kết hôn” xảy ra trước sự việc “Roy được thuê” => chia thì quá khứ hoàn thành."
        },
        {
          "num": 26,
          "type": "choice",
          "text": "I know too little Dutch to have understood what they were talking about. What I_____was that their boss would be there the next morning.",
          "options": {
            "A": "understood",
            "B": "didn't understand",
            "C": "have understood",
            "D": "could have understood"
          },
          "answer": "A",
          "explanation": "Dịch nghĩa: Tôi biết quá ít về tiếng Hà Lan để hiểu những gì họ đang nói. Điều tôi đã hiểu là ông chủ của họ sẽ ở đó vào sáng hôm sau.\u000bCăn cứ: diễn tả hành động xảy ra và kết thúc trong quá khứ."
        },
        {
          "num": 27,
          "type": "choice",
          "text": "The driver_____violently and managed to stop the car just inches from the body lying on the road.",
          "options": {
            "A": "was braking",
            "B": "has braked",
            "C": "braked",
            "D": "had braked"
          },
          "answer": "C",
          "explanation": "Dịch nghĩa: Người lái xe đã phanh gấp và cố gắng dừng chiếc xe chỉ cách cơ thể nằm trên đường vài inch.\u000b+ “Phanh gấp => cố gắng để dừng lại” là những hành động xảy ra liên tiếp trong quá khứ => chia thì quá khứ đơn."
        },
        {
          "num": 28,
          "type": "choice",
          "text": "They stopped to take a rest because they_____long enough.",
          "options": {
            "A": "have worked",
            "B": "had been working",
            "C": "worked",
            "D": "were working"
          },
          "answer": "B",
          "explanation": "+ Hành động \"làm việc\"  kéo dài liên tục, xảy ra trước hành động \"dừng lại để nghỉ\".\n=> chia thì quá khứ hoàn thành tiếp diễn. \n- Dịch nghĩa: Họ đã dừng lại để nghỉ ngơi bởi trước đó họ đã làm việc liên tục đủ lâu rồi."
        },
        {
          "num": 29,
          "type": "choice",
          "text": "The performance_____at 7 o'clock and_____for three hours. We all_____it.",
          "options": {
            "A": "had begun/lasted/enjoyed",
            "B": "began/had lasted/enjoyed",
            "C": "began/lasted/enjoyed",
            "D": "began/lasted/enjoy"
          },
          "answer": "C",
          "explanation": "Căn cứ: cách dùng của thì quá khứ đơn: kể lại những hành động xảy ra liên tiếp trong quá khứ.\u000b- Dịch nghĩa: Buổi biểu diễn bắt đầu lúc 7 giờ và kéo dài trong ba tiếng. Tất cả chúng tôi đều thích nó."
        },
        {
          "num": 30,
          "type": "choice",
          "text": "By the time you_____cooking, they had done their homework.",
          "options": {
            "A": "finished",
            "B": "had finished",
            "C": "finish",
            "D": "were finishing"
          },
          "answer": "A",
          "explanation": "Căn cứ vào cấu trúc: By the time + S(quá khứ đơn), S + V(quá khứ hoàn thành).\u000b- Dịch nghĩa: Vào thời điểm bạn nấu ăn xong, họ đã hoàn thành xong bài tập về nhà."
        }
      ]
    },
    {
      "name": "Exercise 13",
      "description": "Complete the sentences using the future simple forms of the verbs in brackets.",
      "questions": [
        {
          "num": 1,
          "type": "fill",
          "text": "He_____(help) her take care of her children tomorrow morning.",
          "answer": "will get",
          "explanation": "Dự đoán tương lai hoặc hứa hẹn."
        },
        {
          "num": 2,
          "type": "fill",
          "text": "She_____(bring) you a cup of tea soon.",
          "answer": "will lend",
          "explanation": "Quyết định ngay tại thời điểm nói."
        },
        {
          "num": 3,
          "type": "fill",
          "text": "She hopes that Mary_____(come) to the party tonight.",
          "answer": "will help",
          "explanation": "Lời đề nghị giúp đỡ tại thời điểm nói."
        },
        {
          "num": 4,
          "type": "fill",
          "text": "If you don’t study hard, you_____(not pass) the final exam.",
          "answer": "will open",
          "explanation": "Quyết định làm gì đó ngay lập tức."
        },
        {
          "num": 5,
          "type": "fill",
          "text": "- Where you_____(be) this time next year? - I_____(be) in Japan.",
          "answer": "will show",
          "explanation": "Lời hứa sẽ chỉ dẫn."
        },
        {
          "num": 6,
          "type": "fill",
          "text": "They_____(visit) China next week.",
          "answer": "will answer",
          "explanation": "Quyết định trả lời điện thoại ngay lập tức."
        },
        {
          "num": 7,
          "type": "fill",
          "text": "You look tired, so I_____(bring) you something to eat.",
          "answer": "will love",
          "explanation": "Dự đoán cảm xúc của đối phương."
        },
        {
          "num": 8,
          "type": "fill",
          "text": "In that case, I_____(buy) a coffee as a token of gratitude.",
          "answer": "will phone",
          "explanation": "Lời hứa sẽ gọi điện khi đến nơi."
        },
        {
          "num": 9,
          "type": "fill",
          "text": "I can’t meet you this evening. A friend of mine_____(come) to see me.",
          "answer": "will do",
          "explanation": "Lời hứa sẽ tự làm."
        },
        {
          "num": 10,
          "type": "fill",
          "text": "Don’t worry about your exam. I sure you_____(pass).",
          "answer": "will pay",
          "explanation": "Quyết định trả tiền nước ngay lập tức."
        },
        {
          "num": 11,
          "type": "fill",
          "text": "You don’t need to take an umbrella with you. It_____(not rain).",
          "answer": "will tell",
          "explanation": "Lời hứa giữ bí mật."
        },
        {
          "num": 12,
          "type": "fill",
          "text": "When do you suppose Jan and Mark_____(get) married?",
          "answer": "will meet",
          "explanation": "Quyết định gặp mặt tại ga tàu."
        },
        {
          "num": 13,
          "type": "fill",
          "text": "Tom_____(not pass) the exam. He hasn’t studied hard enough.",
          "answer": "will write",
          "explanation": "Quyết định viết thư trả lời."
        },
        {
          "num": 14,
          "type": "fill",
          "text": "When I finish my work, I_____(pick) you up.",
          "answer": "will buy",
          "explanation": "Quyết định mua bánh mì."
        },
        {
          "num": 15,
          "type": "fill",
          "text": "Think carefully. I'm sure you_____(remember) his name.",
          "answer": "will do",
          "explanation": "Lời hứa sẽ thực hiện nhiệm vụ."
        }
      ]
    },
    {
      "name": "Exercise 14",
      "description": "Complete the sentences using the future continuous forms of the verbs in brackets.",
      "questions": [
        {
          "num": 1,
          "type": "fill",
          "text": "At 10 o’clock tomorrow, she will be in her office. She_____(work).",
          "answer": "will be living",
          "explanation": "Hành động đang diễn ra tại thời điểm xác định trong tương lai ('this time next year')."
        },
        {
          "num": 2,
          "type": "fill",
          "text": "I_____(see) you at the meeting at this time tomorrow.",
          "answer": "will be doing",
          "explanation": "Câu hỏi về hành động đang diễn ra lúc 10 giờ tối mai."
        },
        {
          "num": 3,
          "type": "fill",
          "text": "Where your friends_____(come) at this time tomorrow?",
          "answer": "will be writing",
          "explanation": "Hành động đang diễn ra tại mốc thời gian cụ thể ngày mai ('at that time tomorrow')."
        },
        {
          "num": 4,
          "type": "fill",
          "text": "Don’t call me between 7 and 8. We_____(have) dinner then.",
          "answer": "will be learning",
          "explanation": "Hành động đang diễn ra vào lúc 7:45 sáng mai."
        },
        {
          "num": 5,
          "type": "fill",
          "text": "This time tomorrow, I_____(travel) through France.",
          "answer": "will be sleeping",
          "explanation": "Hành động đang diễn ra vào giờ này tối mai."
        },
        {
          "num": 6,
          "type": "fill",
          "text": "I am having vacation this Saturday. This time next week, I_____(lie) on a beach or_____(swim) in the season.",
          "answer": "will be cooking",
          "explanation": "Hành động đang diễn ra khi người kia đến."
        },
        {
          "num": 7,
          "type": "fill",
          "text": "Tom_____(climb) the mountain at this time next Saturday.",
          "answer": "will be sitting / reading",
          "explanation": "Hành động sẽ đang diễn ra khi được nhìn thấy vào ngày mai."
        },
        {
          "num": 8,
          "type": "fill",
          "text": "My parents are going to London, so I_____(stay) with my grandmafor the next two weeks.",
          "answer": "will be preparing",
          "explanation": "Hành động nấu cơm đang diễn ra tại thời điểm tôi về nhà ngày mai."
        },
        {
          "num": 9,
          "type": "fill",
          "text": "I am coming home now. When I get home, my dog_____(wait) for me on the doorstep.",
          "answer": "will be waiting",
          "explanation": "Hành động đang diễn ra khi tôi đến ngày mai."
        },
        {
          "num": 10,
          "type": "fill",
          "text": "Tomorrow afternoon we are going to play tennis from 3:00 until 4:30. So at 4:00, we_____(play) tennis then.",
          "answer": "will be cooking / will be watching",
          "explanation": "Hai hành động diễn ra song song đồng thời trong tương lai."
        },
        {
          "num": 11,
          "type": "fill",
          "text": "- Can we meet you tomorrow afternoon? - I’m afraid not. I_____(work).",
          "answer": "will be leaving",
          "explanation": "Hành động đang diễn ra khi có sự việc khác xen vào."
        },
        {
          "num": 12,
          "type": "fill",
          "text": "When she comes home, her children_____(play) toys in the bedroom.",
          "answer": "will be having",
          "explanation": "Hành động ăn tối đang diễn ra khi Beth đến."
        },
        {
          "num": 13,
          "type": "fill",
          "text": "The Browns_____(do) their housework when you come next Sunday.",
          "answer": "will be talking",
          "explanation": "Hành động nói chuyện đang diễn ra lúc người nghe liên lạc."
        },
        {
          "num": 14,
          "type": "fill",
          "text": "Unfortunately, I_____(work) on my essay so I won’t be able to watch the match.",
          "answer": "will be working",
          "explanation": "Hành động làm việc đang diễn ra khi giám đốc liên hệ."
        },
        {
          "num": 15,
          "type": "fill",
          "text": "At 12 o’clock tomorrow, my friends and I_____(have) lunch at school.",
          "answer": "will be enjoying",
          "explanation": "Hành động đang tận hưởng bữa tiệc vào ngày mai."
        }
      ]
    },
    {
      "name": "Exercise 15",
      "description": "Complete the sentences using the future perfect forms of the verbs in brackets.",
      "questions": [
        {
          "num": 1,
          "type": "fill",
          "text": "By the time next year I hope that I_____(find) a good job.",
          "answer": "will have finished",
          "explanation": "Hành động hoàn thành trước một mốc thời gian tương lai ('by tomorrow')."
        },
        {
          "num": 2,
          "type": "fill",
          "text": "Anne_____(repair) her bike by next week.",
          "answer": "will have read",
          "explanation": "Hành động hoàn thành trước khi năm nay kết thúc ('by the end of this year')."
        },
        {
          "num": 3,
          "type": "fill",
          "text": "By the time we are fifty, our kid_____(leave) school.",
          "answer": "will have built",
          "explanation": "Hành động xây cầu hoàn thành trước mốc tương lai 'by 2028'."
        },
        {
          "num": 4,
          "type": "fill",
          "text": "She_____(visit) Paris by the end of next week.",
          "answer": "will have left",
          "explanation": "Hành động rời đi hoàn thành trước khi bạn đến ('by the time you arrive')."
        },
        {
          "num": 5,
          "type": "fill",
          "text": "Next week, they_____(marry) for 25 years.",
          "answer": "will have worked",
          "explanation": "Hành động làm việc được 5 năm tính đến tháng sau ('by next month')."
        },
        {
          "num": 6,
          "type": "fill",
          "text": "The fire_____(destroy) the whole building before the firemen arrive.",
          "answer": "will have retired",
          "explanation": "Hoàn thành trước khi anh ấy 60 tuổi ('by the time he is 60')."
        },
        {
          "num": 7,
          "type": "fill",
          "text": "Call me after 8:00. We_____(finish) dinner by then.",
          "answer": "will have written",
          "explanation": "Viết xong báo cáo trước cuộc họp ('by the time of the meeting')."
        },
        {
          "num": 8,
          "type": "fill",
          "text": "We are late. The movie_____already (start) by the time we get to the theater.",
          "answer": "will have lived",
          "explanation": "Sống ở đây được 10 năm tính đến cuối năm nay."
        },
        {
          "num": 9,
          "type": "fill",
          "text": "I_____(meet) John before I leave for Paris.",
          "answer": "will have completed",
          "explanation": "Hoàn thành khóa học trước khi tốt nghiệp."
        },
        {
          "num": 10,
          "type": "fill",
          "text": "By ten o’clock tomorrow, they_____(arrive) in Houston.",
          "answer": "will have answered",
          "explanation": "Trả lời xong câu hỏi trước khi bài học kết thúc."
        },
        {
          "num": 11,
          "type": "fill",
          "text": "By the time the new policy comes into effect I’m sure there_____(be) some changes.",
          "answer": "will have gone",
          "explanation": "Hành động đi ngủ hoàn thành trước khi bạn gọi điện."
        },
        {
          "num": 12,
          "type": "fill",
          "text": "I suppose when I come back in two years’ time they_____(pull) down all these old houses.",
          "answer": "will have arrived",
          "explanation": "Đến nơi trước khi trời tối."
        },
        {
          "num": 13,
          "type": "fill",
          "text": "Lisa is from New Zealand. She is travelling around Canada at the moment. So far she has travelled about 1000 miles. By the end of the trip, she_____(travel) more than 3000 miles.",
          "answer": "will have completed",
          "explanation": "Hoàn thành dự án trước khi năm mới bắt đầu."
        },
        {
          "num": 14,
          "type": "fill",
          "text": "You are too late. By the time you arrive, they_____(finish) their speech and everyone_____(go) home.",
          "answer": "will have sold",
          "explanation": "Bán hết vé trước khi buổi biểu diễn bắt đầu."
        },
        {
          "num": 15,
          "type": "fill",
          "text": "Ben is on vacation, and he is spending his money very quickly. If he continues like this, he_____(spend) all his money before the end of the vacation.",
          "answer": "will have done",
          "explanation": "Làm xong bài tập trước giờ học."
        }
      ]
    },
    {
      "name": "Exercise 16",
      "description": "Complete the sentences using the future perfect and the future perfect continuous forms of the verbs in brackets.",
      "questions": [
        {
          "num": 1,
          "type": "fill",
          "text": "Laura_____(study) English for 10 years by the end of next month.",
          "answer": "will have been waiting",
          "explanation": "Nhấn mạnh thời gian chờ đợi liên tục 2 tiếng tính đến khi cô ấy đến."
        },
        {
          "num": 2,
          "type": "fill",
          "text": "By April 28th, she_____(work) for this company for 19 years.",
          "answer": "will have been doing",
          "explanation": "Nhấn mạnh thời gian làm công việc đó liên tục 20 năm tính đến năm sau."
        },
        {
          "num": 3,
          "type": "fill",
          "text": "Remember that we_____(move) to our new flat by the time you come back from business trip.",
          "answer": "will have been studying",
          "explanation": "Học tiếng Anh liên tục được 6 tháng tính đến tháng sau."
        },
        {
          "num": 4,
          "type": "fill",
          "text": "They_____(get) married for 2 years by the end of this year.",
          "answer": "will have been working",
          "explanation": "Làm việc liên tục được 3 tháng tính đến cuối tuần này."
        },
        {
          "num": 5,
          "type": "fill",
          "text": "When she gets her degree, she_____(study) at Cambridge for four years.",
          "answer": "will have been raining",
          "explanation": "Mưa liên tục được 5 tiếng tính đến tối nay."
        },
        {
          "num": 6,
          "type": "fill",
          "text": "By the end of this year, he_____(work) for this company for 5 years.",
          "answer": "will have been reading",
          "explanation": "Đọc sách liên tục được 3 ngày tính đến ngày mai."
        },
        {
          "num": 7,
          "type": "fill",
          "text": "They_____(talk) with each other for an hour by the time I get home.",
          "answer": "will have been looking",
          "explanation": "Tìm việc liên tục được 4 tháng tính đến khi kết thúc học kỳ."
        },
        {
          "num": 8,
          "type": "fill",
          "text": "By the end of this month, my grandfather_____(write) this novel for 2 months.",
          "answer": "will have been sitting",
          "explanation": "Ngồi đợi liên tục được 1 tiếng tính đến khi xe buýt đến."
        },
        {
          "num": 9,
          "type": "fill",
          "text": "By the time the Son La Dam project is completed, we_____(work) together for at least eight years.",
          "answer": "will have been working",
          "explanation": "Làm việc liên tục được 12 tiếng tính đến cuối ngày."
        },
        {
          "num": 10,
          "type": "fill",
          "text": "How many questions you_____(answer) by the time the lesson finishes?",
          "answer": "will have been sleeping",
          "explanation": "Ngủ liên tục được 10 tiếng tính đến khi bạn đánh thức cô ấy."
        },
        {
          "num": 11,
          "type": "fill",
          "text": "- You_____(live) in this country for 2 months by the end of this week?",
          "answer": "will have been reading",
          "explanation": "Đọc sách liên tục được 2 tiếng tính đến tối nay."
        },
        {
          "num": 12,
          "type": "fill",
          "text": "By November they_____(work) for this company for 6 years.",
          "answer": "will have been waiting",
          "explanation": "Chờ xe buýt liên tục được nửa tiếng tính đến khi xe tới."
        },
        {
          "num": 13,
          "type": "fill",
          "text": "We_____(live) in London for 14 years by 2019.",
          "answer": "will have been arguing",
          "explanation": "Tranh luận liên tục được 1 tiếng tính đến khi giáo viên vào."
        },
        {
          "num": 14,
          "type": "fill",
          "text": "By the time my father gets home from work, I_____ (do) my homework for 2 hours.",
          "answer": "will have been looking",
          "explanation": "Tìm kiếm túi xách liên tục được 1 tiếng tính đến khi tìm ra."
        },
        {
          "num": 15,
          "type": "fill",
          "text": "My mother_____(cook) dinner for 3 hours by the time our guests arrive at my house.",
          "answer": "will have been thinking",
          "explanation": "Suy nghĩ liên tục về lời khuyên được 3 ngày tính đến ngày mai."
        }
      ]
    },
    {
      "name": "Exercise 17",
      "description": "Complete the sentences using the near future forms of the verbs in brackets.",
      "questions": [
        {
          "num": 1,
          "type": "fill",
          "text": "- There is a movie on TV tonight. You_____(watch) it? - No, I_____(write) some letters.",
          "answer": "is going to rain",
          "explanation": "Dự đoán trời mưa dựa trên dấu hiệu đám mây đen."
        },
        {
          "num": 2,
          "type": "fill",
          "text": "Look at those black clouds! It_____(rain).",
          "answer": "am going to buy",
          "explanation": "Dự định mua nhà đã lên kế hoạch từ trước."
        },
        {
          "num": 3,
          "type": "fill",
          "text": "We_____(take) a trip to HCM city this weekend.",
          "answer": "is going to have",
          "explanation": "Dự kiến có em bé vào tháng sau."
        },
        {
          "num": 4,
          "type": "fill",
          "text": "My father_____(play) tennis in 15 minutes because he has just worn sport clothes.",
          "answer": "is going to fall",
          "explanation": "Dự đoán tường đổ dựa trên dấu hiệu nó bị nứt và rung lắc."
        },
        {
          "num": 5,
          "type": "fill",
          "text": "- Can you tell me about our school plan tomorrow? - We_____(visit) the museum in the morning.",
          "answer": "are you going to do",
          "explanation": "Hỏi về dự định/kế hoạch tối nay."
        },
        {
          "num": 6,
          "type": "fill",
          "text": "She_____(buy) a new house next month because she has had enough money.",
          "answer": "is going to write",
          "explanation": "Dự định viết thư cho bạn bè."
        },
        {
          "num": 7,
          "type": "fill",
          "text": "- You don’t seem to enjoy your piano lessons. - I don’t. I_____(quit) soon.",
          "answer": "am going to study",
          "explanation": "Dự định học bài ở thư viện chiều nay."
        },
        {
          "num": 8,
          "type": "fill",
          "text": "I_____(visit) my parents at the weekend. I have already bought a train ticket.",
          "answer": "is going to start",
          "explanation": "Kế hoạch bắt đầu công việc mới tuần sau."
        },
        {
          "num": 9,
          "type": "fill",
          "text": "The man can’t see the hole in front of him. He_____(fall) into the hole.",
          "answer": "is going to open",
          "explanation": "Kế hoạch mở cửa hàng mới."
        },
        {
          "num": 10,
          "type": "fill",
          "text": "- I hear you have been offered a job. - That right, but I_____(not take) it.",
          "answer": "is going to travel",
          "explanation": "Kế hoạch đi du lịch quanh thế giới."
        },
        {
          "num": 11,
          "type": "fill",
          "text": "I feel terrible. I think I_____(be) sick.",
          "answer": "is going to sell",
          "explanation": "Dự định bán xe cũ."
        },
        {
          "num": 12,
          "type": "fill",
          "text": "- Ann is in hospital. - Yes, I know. I_____(visit) her tonight.",
          "answer": "are going to build",
          "explanation": "Kế hoạch xây nhà mới."
        },
        {
          "num": 13,
          "type": "fill",
          "text": "There is a hole in the bottom of the boat. A lot of water is coming in through the hole. The boat_____(sink).",
          "answer": "is going to learn",
          "explanation": "Dự định học lái xe."
        },
        {
          "num": 14,
          "type": "fill",
          "text": "Sue and I have decided to have a party. We_____(invite) a lot of people.",
          "answer": "am going to clean",
          "explanation": "Kế hoạch dọn dẹp phòng vào cuối tuần."
        },
        {
          "num": 15,
          "type": "fill",
          "text": "Erica is driving. There is very little gas left in the tank. The nearest gas station is far away. She_____(run out) of gas.",
          "answer": "is going to invite",
          "explanation": "Dự định mời bạn bè đến dự tiệc sinh nhật."
        }
      ]
    },
    {
      "name": "Exercise 18",
      "description": "Choose the bestword or phrase to complete in the following questions.",
      "questions": [
        {
          "num": 1,
          "type": "choice",
          "text": "He_____to the theatre tonight. He has got a free ticket.",
          "options": {
            "A": "goes",
            "B": "is going",
            "C": "went",
            "D": "will go"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 2,
          "type": "choice",
          "text": "Not a cloud in the sky. It_____another warm day.",
          "options": {
            "A": "may be",
            "B": "will be",
            "C": "is",
            "D": "is going to be"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 3,
          "type": "choice",
          "text": "When I retire, I_____to Barbados to live.",
          "options": {
            "A": "am going to come back",
            "B": "will come back",
            "C": "shall come back_____",
            "D": "am coming back"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 4,
          "type": "choice",
          "text": "What time_____tomorrow?",
          "options": {
            "A": "are you going to leave",
            "B": "do you leave",
            "C": "will you leave",
            "D": "would you leave"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 5,
          "type": "choice",
          "text": "Who_____the next World Cup?",
          "options": {
            "A": "is going to win",
            "B": "is wining",
            "C": "will win",
            "D": "win"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 6,
          "type": "choice",
          "text": "The traffic is terrible. We_____our flight.",
          "options": {
            "A": "miss",
            "B": "will miss",
            "C": "are missing",
            "D": "are going to miss"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 7,
          "type": "choice",
          "text": "I_____my books for my readers in a book exhibition at this time tomorrow.",
          "options": {
            "A": "am going to sign",
            "B": "will be signing",
            "C": "will sign",
            "D": "will have been signing"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 8,
          "type": "choice",
          "text": "We_____her the truth when she_____home.",
          "options": {
            "A": "are going to tell - will come",
            "B": "are telling - comes",
            "C": "will tell - will come",
            "D": "will tell - comes"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 9,
          "type": "choice",
          "text": "In two months’ time, Raymond_____from the college with a degree and will be expecting a respected and well-paid job.",
          "options": {
            "A": "will be graduating",
            "B": "has graduated",
            "C": "will have graduated",
            "D": "has been graduating"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 10,
          "type": "choice",
          "text": "They_____our winter house by the time we_____from our summer house.",
          "options": {
            "A": "painted - had returned",
            "B": "will have painted - return",
            "C": "will be painting - have returned",
            "D": "have been painting - have returned"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 11,
          "type": "choice",
          "text": "A: Can you join us for a picnic tomorrow? B: Thanks, but I_____to the cinema with Anna.",
          "options": {
            "A": "go",
            "B": "will go",
            "C": "am going",
            "D": "have gone"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 12,
          "type": "choice",
          "text": "Next Saturday at this time, we_____on the beach in Mexico.",
          "options": {
            "A": "will relax",
            "B": "relax",
            "C": "will be relaxing",
            "D": "are going to relax"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 13,
          "type": "choice",
          "text": "Let’s take her some pizza and Coke. I’m sure she will be tired when we get home, because she_____the flat all afternoon.",
          "options": {
            "A": "will have been cleaning",
            "B": "will be cleaning",
            "C": "is going to clean",
            "D": "have been cleaning"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 14,
          "type": "choice",
          "text": "In six months’ time, she_____from the university.",
          "options": {
            "A": "is going to graduate",
            "B": "will be graduating",
            "C": "will graduate",
            "D": "will have graduated"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 15,
          "type": "choice",
          "text": "If you need to reach us, we_____at the Fairmont Hotel that time.",
          "options": {
            "A": "have been staying",
            "B": "are staying",
            "C": "will be staying",
            "D": "had been staying"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 16,
          "type": "choice",
          "text": "We_____you as soon as we arrive in Paris.",
          "options": {
            "A": "will call",
            "B": "call",
            "C": "have called",
            "D": "would call"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 17,
          "type": "choice",
          "text": "You_____yourselves in the Caribbean, while we’re stuck here in New York with this cold weather.",
          "options": {
            "A": "are staying",
            "B": "will be enjoying",
            "C": "have been staying",
            "D": "had been staying"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 18,
          "type": "choice",
          "text": "Susan_____credit card payments until her debt is all paid off.",
          "options": {
            "A": "make",
            "B": "have made",
            "C": "are made",
            "D": "will make"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 19,
          "type": "choice",
          "text": "The sky is very black. It_____.",
          "options": {
            "A": "snows",
            "B": "is snowing",
            "C": "is going to snow",
            "D": "will snow"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 20,
          "type": "choice",
          "text": "But all these things_____if you marry me.",
          "options": {
            "A": "will happen only",
            "B": "will only happen",
            "C": "happen",
            "D": "are going to happen"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 21,
          "type": "choice",
          "text": "I haven't made up my mind yet. But I think I_____something nice in my mum's wardrobe.",
          "options": {
            "A": "am going to",
            "B": "will find",
            "C": "am finding",
            "D": "was finding"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 22,
          "type": "choice",
          "text": "My horoscope says that I_____an old friend this week.",
          "options": {
            "A": "meet",
            "B": "will meet",
            "C": "am meeting",
            "D": "meets"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 23,
          "type": "choice",
          "text": "At this time next Friday evening Mrs. Almanac_____refreshments for her son’s engagement party and_____her future daughter-in-law.",
          "options": {
            "A": "will prepare - will be helping",
            "B": "will be preparing - will be helping",
            "C": "will be preparing - will help",
            "D": "will prepare - will have helped"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 24,
          "type": "choice",
          "text": "By the end of next year, Geoge_____English for 2 years.",
          "options": {
            "A": "will have learned",
            "B": "will learn",
            "C": "has learned",
            "D": "would learn"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 25,
          "type": "choice",
          "text": "When will you send the message? - We_____it by Friday.",
          "options": {
            "A": "will deliver",
            "B": "am going to deliver",
            "C": "will be delivering",
            "D": "will have delivered"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 26,
          "type": "choice",
          "text": "Can we start the party at 3 o'clock? - I don't think so. All our guests _____by then. I'm afraid.",
          "options": {
            "A": "won't have arrived",
            "B": "don't arrive",
            "C": "haven't arrived",
            "D": "didn't arrive"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 27,
          "type": "choice",
          "text": "- What does a blonde say when she sees a banana skin lying just a few metres in front of her? - Oh dear! I_____.",
          "options": {
            "A": "to slip",
            "B": "will slip",
            "C": "am sliping",
            "D": "am going to slip"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 28,
          "type": "choice",
          "text": "Here is the weather forecast. Tomorrow_____dry and sunny.",
          "options": {
            "A": "is going to be",
            "B": "will be",
            "C": "is",
            "D": "would be"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 29,
          "type": "choice",
          "text": "Can I have a look at your photos tomorrow? - No, I'm sorry. I_____ them by tomorrow.",
          "options": {
            "A": "will not develop",
            "B": "shall not develop",
            "C": "will not have developed",
            "D": "am developing"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 30,
          "type": "choice",
          "text": "I know by the time they come to my house this evening, I_____out for a walk.",
          "options": {
            "A": "will have gone",
            "B": "will go",
            "C": "will be going",
            "D": "shall go"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 31,
          "type": "choice",
          "text": "These machines_____very well by the time you come back next month.",
          "options": {
            "A": "will be working",
            "B": "are going to work",
            "C": "will have worked",
            "D": "are working"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 32,
          "type": "choice",
          "text": "I hope they_____building the road by the time we come back next summer.",
          "options": {
            "A": "are finishing",
            "B": "will be working",
            "C": "are going to work",
            "D": "will have finished"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 33,
          "type": "choice",
          "text": "By 2020, the number of schools in our country_____.",
          "options": {
            "A": "will double",
            "B": "will have doubled",
            "C": "are doubling",
            "D": "shall double"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 34,
          "type": "choice",
          "text": "They_____the classroom by the end of the hour.",
          "options": {
            "A": "are going to leave",
            "B": "will be leaving",
            "C": "will have left",
            "D": "are leaving"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 35,
          "type": "choice",
          "text": "They_____pingpong when their father comes back home.",
          "options": {
            "A": "will play",
            "B": "will be playing",
            "C": "play",
            "D": "would play"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 36,
          "type": "choice",
          "text": "I’m going on holiday on Saturday.This time next week I_____on a beach in the sea.",
          "options": {
            "A": "will lie",
            "B": "am lying",
            "C": "will be lying",
            "D": "should be lying"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 37,
          "type": "choice",
          "text": "At 8 o’clock this evening my friends and I_____a famous film at the cinema.",
          "options": {
            "A": "were watching",
            "B": "will be watching",
            "C": "have been watching",
            "D": "watched"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 38,
          "type": "choice",
          "text": "They_____their presentation at this time tomorrow morning.",
          "options": {
            "A": "are making",
            "B": "are going to make",
            "C": "will be making",
            "D": "will make"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 39,
          "type": "choice",
          "text": "When they_____tomorrow, we_____in the sea.",
          "options": {
            "A": "come - swim",
            "B": "are coming - swim",
            "C": "are coming - are swimming",
            "D": "come - will be swimming"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 40,
          "type": "choice",
          "text": "She_____from the excursion by 6 o'clock.",
          "options": {
            "A": "will have returned",
            "B": "is going to return",
            "C": "is returning",
            "D": "will be returning"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 41,
          "type": "choice",
          "text": "We_____working for ten days when they pay our wages tomorrow.",
          "options": {
            "A": "were going to be",
            "B": "are going to",
            "C": "will be",
            "D": "will have been"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 42,
          "type": "choice",
          "text": "By the end of next month, I_____the project to the committee.",
          "options": {
            "A": "will have presented",
            "B": "will present",
            "C": "will be presenting",
            "D": "will have been presenting"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 43,
          "type": "choice",
          "text": "She_____the movie before you bring the DVD.",
          "options": {
            "D": "will have seen",
            "A": "is seeing",
            "B": "will be seeing",
            "C": "is going to see"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 44,
          "type": "choice",
          "text": "When you look through the small window, you_____that the safe is in its usual place.",
          "options": {
            "A": "would discover",
            "B": "discovered",
            "C": "will be discovering",
            "D": "will discover"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 45,
          "type": "choice",
          "text": "Tell him I_____anything with him until I have spoken with my wife.",
          "options": {
            "A": "won’t discuss",
            "B": "haven’t discussed",
            "C": "don’t discuss",
            "D": "didn’t discuss"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 46,
          "type": "choice",
          "text": "When I finish this course, I_____to the next level.",
          "options": {
            "A": "have gone",
            "B": "will go",
            "C": "went",
            "D": "would go"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 47,
          "type": "choice",
          "text": "She is really worried that she_____to the exam because she doesn’t have her identity card on her.",
          "options": {
            "A": "haven’t admitted",
            "B": "is not admittting",
            "C": "hadn’t been admitted",
            "D": "won’t be admitted"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 48,
          "type": "choice",
          "text": "My mom_____for two days by the time I see her.",
          "options": {
            "A": "will have been travelling",
            "B": "has been travelling",
            "C": "will has been travelling",
            "D": "has been travelled"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 49,
          "type": "choice",
          "text": "That cat_____you if you pull its tail.",
          "options": {
            "A": "scratches",
            "B": "has scratched",
            "C": "will scratch",
            "D": "is going to scratch"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 50,
          "type": "choice",
          "text": "I_____Alex your letter when I see her tomorrow.",
          "options": {
            "A": "will send",
            "B": "am going to send",
            "C": "are sending",
            "D": "shall send"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 51,
          "type": "choice",
          "text": "- What are your plans for the holiday? - I_____my grandparents and then go trekking in Sapa.",
          "options": {
            "A": "am going to visit",
            "B": "shall go",
            "C": "will go to visit",
            "D": "will go"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        }
      ]
    },
    {
      "name": "Exercise 19",
      "description": "Mark the letter A, B, C or D to indicate the correct answer to each of the following questions.",
      "questions": [
        {
          "num": 1,
          "type": "choice",
          "text": "- “Your face_____dirty, Tom.\" - \"All right I_____it.”",
          "options": {
            "A": "is/am going to wash",
            "B": "is/will wash",
            "C": "has been/am washing",
            "D": "has been/will wash"
          },
          "answer": "came / was sleeping",
          "explanation": "Hành động xen vào (quá khứ đơn) và hành động đang diễn ra (quá khứ tiếp diễn)."
        },
        {
          "num": 2,
          "type": "choice",
          "text": "They_____the results tomorrow morning at nine o'clock.",
          "options": {
            "A": "announce",
            "B": "will announce",
            "C": "will be announcing",
            "D": "will have announced"
          },
          "answer": "starts",
          "explanation": "Sự thật hiển nhiên hoặc thời gian biểu cố định."
        },
        {
          "num": 3,
          "type": "choice",
          "text": "I suppose when I_____back in two years' time, they_____down all these old buildings.",
          "options": {
            "A": "come/will pull",
            "B": "come/will be pulled",
            "C": "come/will have pulled",
            "D": "will come/pull"
          },
          "answer": "arrived / had left",
          "explanation": "Hành động xảy ra trước (quá khứ hoàn thành) và hành động xảy ra sau (quá khứ đơn)."
        },
        {
          "num": 4,
          "type": "choice",
          "text": "Thousands of people_____this exhibition by the end of next month.",
          "options": {
            "A": "will see",
            "B": "will be seeing",
            "C": "will have seen",
            "D": "see"
          },
          "answer": "is studying",
          "explanation": "Hành động đang diễn ra tại thời điểm nói ('at present')."
        },
        {
          "num": 5,
          "type": "choice",
          "text": "By the time you finish cooking they_____their homework.",
          "options": {
            "A": "do",
            "B": "have done",
            "C": "will do",
            "D": "will have done"
          },
          "answer": "have known",
          "explanation": "Mối quan hệ kéo dài từ quá khứ đến hiện tại với động từ trạng thái 'know'."
        },
        {
          "num": 6,
          "type": "choice",
          "text": "Come to see me at 5 this afternoon. I_____home until 4:30.",
          "options": {
            "A": "don’t arrive",
            "B": "won’t arrive",
            "C": "are not arriving",
            "D": "haven’t arrived"
          },
          "answer": "lost / was walking",
          "explanation": "Hành động xen vào (làm mất ví) và hành động đang diễn ra (đi bộ)."
        },
        {
          "num": 7,
          "type": "choice",
          "text": "No one_____when he_____tomorrow, or whether he will come at all.",
          "options": {
            "A": "knows/will come",
            "B": "will know/will come",
            "C": "knows/is coming",
            "D": "knows/comes"
          },
          "answer": "will meet",
          "explanation": "Quyết định làm gì đó trong tương lai."
        },
        {
          "num": 8,
          "type": "choice",
          "text": "I_____back as soon as I get through with my business.",
          "options": {
            "A": "will come",
            "B": "come",
            "C": "would come",
            "D": "am coming"
          },
          "answer": "had finished / went",
          "explanation": "Làm xong việc trước (quá khứ hoàn thành) rồi mới đi ngủ (quá khứ đơn)."
        },
        {
          "num": 9,
          "type": "choice",
          "text": "The police hope they_____the mystery soon.",
          "options": {
            "A": "will have solved",
            "B": "will be solving",
            "C": "will solve",
            "D": "will have been solving"
          },
          "answer": "is always talking",
          "explanation": "Lời phàn nàn đi kèm trạng từ 'always' chia hiện tại tiếp diễn."
        },
        {
          "num": 10,
          "type": "choice",
          "text": "What_____at 10:20 pm tomorrow?",
          "options": {
            "A": "were you doing",
            "B": "will you do",
            "C": "are you doing",
            "D": "will you be doing"
          },
          "answer": "leaves",
          "explanation": "Lịch trình phương tiện công cộng chia hiện tại đơn."
        },
        {
          "num": 11,
          "type": "choice",
          "text": "You haven’t seen my sister for a long time. us tonight?",
          "options": {
            "A": "Are you going to visit",
            "B": "Will you visit",
            "C": "Are you visiting",
            "D": "Can you visit"
          },
          "answer": "was cooking / was watching",
          "explanation": "Hai hành động xảy ra song song đồng thời trong quá khứ."
        },
        {
          "num": 12,
          "type": "choice",
          "text": "At this time next, week they_____in the train on their way to Paris.",
          "options": {
            "A": "will sit",
            "B": "will be sitting",
            "C": "will have sat",
            "D": "will have been sitting"
          },
          "answer": "has been learning",
          "explanation": "Nhấn mạnh khoảng thời gian học tiếng Anh liên tục suốt 3 năm."
        },
        {
          "num": 13,
          "type": "choice",
          "text": "By 2025, this area_____turned into an industrial centre.",
          "options": {
            "A": "will be",
            "B": "will have been",
            "C": "will",
            "D": "has"
          },
          "answer": "promised / would buy",
          "explanation": "Lời hứa trong quá khứ (chia would + V)."
        },
        {
          "num": 14,
          "type": "choice",
          "text": "They_____English from nine to ten in this room. Don't let anyone disturb them then.",
          "options": {
            "A": "will have",
            "B": "will have had",
            "C": "will be having",
            "D": "have"
          },
          "answer": "had been playing / started",
          "explanation": "Chơi tennis liên tục 1 tiếng trước khi trời mưa."
        },
        {
          "num": 15,
          "type": "choice",
          "text": "The car_____ready for him when he_____tomorrow.",
          "options": {
            "A": "will be/comes",
            "B": "was/came",
            "C": "will have been/comes",
            "D": "will have been/came"
          },
          "answer": "goes",
          "explanation": "Thói quen hàng ngày chia hiện tại đơn."
        },
        {
          "num": 16,
          "type": "choice",
          "text": "I'm going to retire soon. By the first of next July I_____here for 25 years.",
          "options": {
            "A": "will have been working",
            "B": "have been working",
            "C": "had been working",
            "D": "have worked"
          },
          "answer": "was reading / heard",
          "explanation": "Hành động đang diễn ra thì có hành động khác xen vào."
        },
        {
          "num": 17,
          "type": "choice",
          "text": "Don't worry. We_____the report by 11.",
          "options": {
            "A": "finish",
            "B": "have finished",
            "C": "will finish",
            "D": "will have finished"
          },
          "answer": "has not seen",
          "explanation": "Hành động lâu rồi chưa xảy ra tính đến hiện tại."
        },
        {
          "num": 18,
          "type": "choice",
          "text": "Listen! There's someone at the door. I_____the door for you.",
          "options": {
            "A": "am going to open",
            "B": "am opening",
            "C": "open",
            "D": "will open"
          },
          "answer": "had already started / arrived",
          "explanation": "Phim bắt đầu trước khi chúng tôi đến rạp."
        },
        {
          "num": 19,
          "type": "choice",
          "text": "“Look at those dark clouds! “Yes, it_____in some minutes.”",
          "options": {
            "A": "will rain",
            "B": "is going to rain",
            "C": "are going to rain",
            "D": "is raining"
          },
          "answer": "were you doing",
          "explanation": "Hỏi hành động đang diễn ra lúc 10h tối qua."
        },
        {
          "num": 20,
          "type": "choice",
          "text": "It’s very hot. __________ the window, please?",
          "options": {
            "A": "Are you opening",
            "B": "Are you going to open",
            "C": "Will you open",
            "D": "Won’t you open"
          },
          "answer": "am writing",
          "explanation": "Hành động đang diễn ra tại thời điểm nói."
        }
      ]
    },
    {
      "name": "Exercise 20",
      "description": "Mark the letter A, B, C or D to indicate the correct answer to each of the following questions.",
      "questions": [
        {
          "num": 1,
          "type": "choice",
          "text": "While they_____to Wyoming, their car ran out of gas.",
          "options": {
            "A": "drove",
            "B": "had been driving",
            "C": "have driven",
            "D": "were driving"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 2,
          "type": "choice",
          "text": "Alice looked much slimmer because she_____for a few months.",
          "options": {
            "A": "had been dieting",
            "B": "has been dieting",
            "C": "was dieting",
            "D": "diets"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 3,
          "type": "choice",
          "text": "When she’s done the ironing, she_____the length of the dress for me.",
          "options": {
            "A": "is altering",
            "B": "altered",
            "C": "will alter",
            "D": "has altered"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 4,
          "type": "choice",
          "text": "You are too slow. I’m sure that by the time you phone them, they_____that car to someone else.",
          "options": {
            "A": "will sell",
            "B": "will have sold",
            "C": "are going to sell",
            "D": "are selling"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 5,
          "type": "choice",
          "text": "As soon as they_____my last book, I_____you a copy with my autograph.",
          "options": {
            "A": "will print - will send",
            "B": "had printed - will send",
            "C": "printed - will be sending",
            "D": "print - will send"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 6,
          "type": "choice",
          "text": "Because the children_____forward to seeing Harry Potter for so long, I took them even though it was really inconvenient for me.",
          "options": {
            "A": "had been looking",
            "B": "were looking",
            "C": "have been looking",
            "D": "looked"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 7,
          "type": "choice",
          "text": "When we_____at the airport we_____that we_____our passports at the office.",
          "options": {
            "A": "arrived - had noticed - had left",
            "B": "arrived - noticed - had left",
            "C": "have arrived - noticed – left",
            "D": "had arrived - have noticed - have left"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 8,
          "type": "choice",
          "text": "Generally he_____to work by car, but today he_____by bus because his car is in the garage.",
          "options": {
            "A": "went - went",
            "B": "was going - is going",
            "C": "goes - is going",
            "D": "has been going - goes"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 9,
          "type": "choice",
          "text": "He_____for over three hours when he finished the report.",
          "options": {
            "A": "will have typed",
            "B": "was typing",
            "C": "has been typing",
            "D": "had been typing"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 10,
          "type": "choice",
          "text": "Three days ago her boyfriend_____her and she_____continually ever since.",
          "options": {
            "A": "left - is crying",
            "B": "had left - cried",
            "C": "left - has been crying",
            "D": "had left - was crying"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 11,
          "type": "choice",
          "text": "This is the first customer we_____something today.",
          "options": {
            "A": "have sold",
            "B": "sold",
            "C": "had sold",
            "D": "were selling"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 12,
          "type": "choice",
          "text": "Andrew_____the plants in the garden right now but I_____sure that it will rain this afternoon.",
          "options": {
            "A": "is watering - was",
            "B": "is watering - am",
            "C": "waters - am",
            "D": "watered - was"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 13,
          "type": "choice",
          "text": "She should have informed the police as soon as she_____that her purse had been stolen.",
          "options": {
            "A": "discovers",
            "B": "would discover",
            "C": "had discovered",
            "D": "has discovered"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 14,
          "type": "choice",
          "text": "My father_____to rent a car when one of his friends phoned him to offer his own car for the trip.",
          "options": {
            "A": "had decided",
            "B": "was deciding",
            "C": "has decided",
            "D": "decided"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 15,
          "type": "choice",
          "text": "When he_____he_____on a bed in a room with no windows.",
          "options": {
            "A": "had woken up - was lying",
            "B": "woke up - was lying",
            "C": "wakes up - is lying",
            "D": "woke up - lay"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 16,
          "type": "choice",
          "text": "The teacher_____to the class before the students_____the problems.",
          "options": {
            "A": "will come back - have solved",
            "B": "had come back - solved",
            "C": "came back - have solved",
            "D": "is coming back - solve"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 17,
          "type": "choice",
          "text": "Yesterday on TV they_____a heavy shower for today, but I_____ even a single drop yet.",
          "options": {
            "A": "announced - am not seeing",
            "B": "announced - didn’t see",
            "C": "have announced - haven’t seen",
            "D": "announced - haven’t seen"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 18,
          "type": "choice",
          "text": "You don’t have to worry about the children, they_____all about this by the end of the semester.",
          "options": {
            "A": "will be forgetting",
            "B": "will have forgotten",
            "C": "will forget",
            "D": "are going to forget"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 19,
          "type": "choice",
          "text": "I’ve just noticed that she_____a haircut. It_____wonderful.",
          "options": {
            "A": "will have - has looked",
            "B": "had had - looked",
            "C": "has had - looks",
            "D": "had - is looking"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 20,
          "type": "choice",
          "text": "While she_____for her sister outside the supermarket, someone _____her handbag.",
          "options": {
            "A": "had to wait - had stolen",
            "B": "waited - had been stealing",
            "C": "had waited - was stealing",
            "D": "was waiting - stole"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 21,
          "type": "choice",
          "text": "The spokesperson_____her speech yet when an angry audience member_____shouting at her.",
          "options": {
            "A": "won’t finish - begins",
            "B": "didn’t finish - was beginning",
            "C": "hadn’t finished - began",
            "D": "doesn’t finish - is beginning"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 22,
          "type": "choice",
          "text": "This is the forty-second composition paper I_____so far, and there _____seventy-five more.",
          "options": {
            "A": "will have checked - are going to be",
            "B": "had checked - were",
            "C": "have checked – are",
            "D": "checked - will be"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 23,
          "type": "choice",
          "text": "The carelessness of parents often_____children to be subject to many household accidents.",
          "options": {
            "A": "causes",
            "B": "have caused",
            "C": "had caused",
            "D": "is caused"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 24,
          "type": "choice",
          "text": "By the end of the term, I_____all eight volumes.",
          "options": {
            "A": "will be reading",
            "B": "read",
            "C": "have read",
            "D": "will have read"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 25,
          "type": "choice",
          "text": "She says she won’t phone us until she_____the information.",
          "options": {
            "A": "has",
            "B": "is having",
            "C": "will have",
            "D": "had"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 26,
          "type": "choice",
          "text": "When we_____out, the chest cavity_____smaller.",
          "options": {
            "A": "breathe - became",
            "B": "breathe - becomes",
            "C": "will breathe - will become",
            "D": "will breathe - becomes"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 27,
          "type": "choice",
          "text": "Our local grocers said he_____the groceries as soon as he_____my order.",
          "options": {
            "A": "had sent - had received",
            "B": "will have sent - has received",
            "C": "has sent – receives",
            "D": "sent - had received"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 28,
          "type": "choice",
          "text": "He_____the mayor of the town for seven years until his death last year.",
          "options": {
            "A": "would have been",
            "B": "has been",
            "C": "had been",
            "D": "will have been"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 29,
          "type": "choice",
          "text": "My father asked me if I_____an increase in salary the following month.",
          "options": {
            "A": "am getting",
            "B": "was getting",
            "C": "am going to get",
            "D": "will get"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 30,
          "type": "choice",
          "text": "As we_____tired of waiting, we_____to go without them.",
          "options": {
            "A": "are - are deciding",
            "B": "were - have decided",
            "C": "are - decided",
            "D": "were - decided"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 31,
          "type": "choice",
          "text": "That cat_____you if you pull its tail.",
          "options": {
            "A": "scratches",
            "B": "has scratched",
            "C": "will scratch",
            "D": "is going to scratch"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 32,
          "type": "choice",
          "text": "I see you have a saw in your hands. you_____the dry tree branches?",
          "options": {
            "A": "Will - cut off",
            "B": "Are - going to cut off",
            "C": "Do - cut off",
            "D": "Will - be cutting off"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 33,
          "type": "choice",
          "text": "I_____coal into the stove. That’s why my hands are all dirty.",
          "options": {
            "A": "had put",
            "B": "was putting",
            "C": "had been putting",
            "D": "have been putting"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 34,
          "type": "choice",
          "text": "The committee_____a report when it_____all the available information.",
          "options": {
            "A": "will submit - has collected",
            "B": "submits - collected",
            "C": "will submit - will collect",
            "D": "will submit - collected"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 35,
          "type": "choice",
          "text": "The patient_____after he_____ill for a long time.",
          "options": {
            "A": "died - has been",
            "B": "dies - had been",
            "C": "died - had been",
            "D": "will die - will be"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 36,
          "type": "choice",
          "text": "By the time the security guards _____ what_____, the gang _____already_____inside the bank.",
          "options": {
            "A": "realized - was happening - had - been",
            "B": "will have realized - will be happening - were",
            "C": "had realized - happened - are",
            "D": "have realized - happened - were"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 37,
          "type": "choice",
          "text": "Although he_____to listen to the teacher, he_____of the football match all the time.",
          "options": {
            "A": "has pretended - thought",
            "B": "pretended - was thinking",
            "C": "pretended - has thought",
            "D": "pretends - was thinking"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 38,
          "type": "choice",
          "text": "He_____so much money that he_____what to do with it.",
          "options": {
            "A": "earned - hadn’t known",
            "B": "earns - didn’t know",
            "C": "earns - doesn’t know",
            "D": "has earned - didn’t know"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 39,
          "type": "choice",
          "text": "“You’ve just missed the last bus.” - “Never mind, I_____.”",
          "options": {
            "A": "will walk",
            "B": "will be walking",
            "C": "walk",
            "D": "am walking"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 40,
          "type": "choice",
          "text": "Ben and Claire_____to pay us a visit as soon as they_____in their new apartment.",
          "options": {
            "A": "promise - settled",
            "B": "have been promising - were settling",
            "C": "promised - are settling",
            "D": "have promised - have settled"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 41,
          "type": "choice",
          "text": "Ford_____his friends, some of whom earn more money than he does.",
          "options": {
            "A": "won’t envy",
            "B": "didn’t envy",
            "C": "doesn’t envy",
            "D": "hasn’t envied"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 42,
          "type": "choice",
          "text": "They_____it unless they_____there is no other way.",
          "options": {
            "A": "aren’t doing - will be thinking",
            "B": "don’t do - will think",
            "C": "haven’t dome - thought",
            "D": "won’t do - think"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 43,
          "type": "choice",
          "text": "In spite of the fact that he_____his cousin, he_____drinking",
          "options": {
            "A": "warned - doesn’t stop",
            "B": "warned - didn’t stop",
            "C": "warned - hadn’t stopped",
            "D": "has warned - didn’t stop"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 44,
          "type": "choice",
          "text": "She_____French since she_____to Illinois.",
          "options": {
            "A": "had studied - came",
            "B": "has studied - has come",
            "C": "has been studying - came",
            "D": "studied - came"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 45,
          "type": "choice",
          "text": "Henry was packing the suitcases while his wife_____the room.",
          "options": {
            "A": "was tidying",
            "B": "tidies",
            "C": "has been tidying",
            "D": "had tidied"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 46,
          "type": "choice",
          "text": "Christine_____as a nurse for seven years, then she became a teacher.",
          "options": {
            "A": "has worked",
            "B": "has been working",
            "C": "was working",
            "D": "worked"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 47,
          "type": "choice",
          "text": "Although she lives in Tokyo, she_____the Royal Palace.",
          "options": {
            "A": "didn’t visit",
            "B": "has never visited",
            "C": "is not visiting",
            "D": "hadn’t visited"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 48,
          "type": "choice",
          "text": "Before we knew what was happening, the roof_____.",
          "options": {
            "A": "has fallen in",
            "B": "will fall in",
            "C": "had fallen in",
            "D": "had been falling in"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 49,
          "type": "choice",
          "text": "They_____how deeply the rows between his parents_____the child.",
          "options": {
            "A": "didn’t realize - had affected",
            "B": "didn’t realize - have affected",
            "C": "don’t realize - affected",
            "D": "will never realize - had affected"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 50,
          "type": "choice",
          "text": "These statistics_____that life expectancy_____quite significantly longer in cold climates than that in warm ones.",
          "options": {
            "A": "show - was",
            "B": "show - is",
            "C": "showed - is",
            "D": "showed - will be"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        }
      ]
    },
    {
      "name": "Exercise 21",
      "description": "Mark the letter A, B, C, or D to indicate the correct answer to each of the following questions.",
      "questions": [
        {
          "num": 1,
          "type": "choice",
          "text": "She_____the letter a few moments before my call came through.",
          "options": {
            "A": "has just opened",
            "B": "had just opened",
            "C": "just opened",
            "D": "just opens"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 2,
          "type": "choice",
          "text": "As soon as the boys_____the hall they_____to speak about books and writers.",
          "options": {
            "A": "entered/begun",
            "B": "were entering/began",
            "C": "entered/began",
            "D": "had entered/began"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 3,
          "type": "choice",
          "text": "While we_____dinner at a restaurant someone came to the house and _____this note.",
          "options": {
            "A": "had had/ left",
            "B": "were having/left",
            "C": "had/left",
            "D": "were having/had left"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 4,
          "type": "choice",
          "text": "By the end of this year we_____a new house.",
          "options": {
            "A": "will buy",
            "B": "will be buying",
            "C": "will have bought",
            "D": "had bought"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 5,
          "type": "choice",
          "text": "“You always_____mistakes, you need_____the instructions more carefully.”",
          "options": {
            "A": "make/read",
            "B": "are always making/read",
            "C": "make/to read",
            "D": "are always making/to read"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 6,
          "type": "choice",
          "text": "Those students who_____the exam are going to take another one held in August.",
          "options": {
            "A": "have failed",
            "B": "failed",
            "C": "had failed",
            "D": "were failing"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 7,
          "type": "choice",
          "text": "I_____your brother this afternoon at Green Street.",
          "options": {
            "A": "met",
            "B": "had met",
            "C": "was meeting",
            "D": "have met"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 8,
          "type": "choice",
          "text": "She said she met you once at the Hilton last year._____since then?",
          "options": {
            "A": "Have you met her",
            "B": "Did you meet her",
            "C": "Were you met her",
            "D": "Had you met her"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 9,
          "type": "choice",
          "text": "Mr. Edwards_____history for 35 years, and is retiring soon.",
          "options": {
            "A": "teaches",
            "B": "is teaching",
            "C": "taught",
            "D": "has been teaching"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 10,
          "type": "choice",
          "text": "I’m tired. I_____the house since 9 this morning.",
          "options": {
            "A": "am cleaning",
            "B": "was cleaning",
            "C": "had been cleaning",
            "D": "have been cleaning"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 11,
          "type": "choice",
          "text": "I can’t believe that you_____all the three exercises. You just started five minutes ago.",
          "options": {
            "A": "have finished",
            "B": "have been finishing",
            "C": "finished",
            "D": "are finishing"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 12,
          "type": "choice",
          "text": "“How’s Peter doing?” “I don’t know. I_____from him for months.”",
          "options": {
            "A": "have to hear",
            "B": "haven’t heard",
            "C": "didn’t hear",
            "D": "don’t hear"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 13,
          "type": "choice",
          "text": "Their children_____lots of new friends since they_____to that town.",
          "options": {
            "A": "have made - moved",
            "B": "were making - have moved",
            "C": "made - are moving",
            "D": "made - have been moving"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 14,
          "type": "choice",
          "text": "He_____a cigarette and_____to the window.",
          "options": {
            "A": "lighted/walked",
            "B": "lit/was walking",
            "C": "was lighted/was walking",
            "D": "lit/had walked"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 15,
          "type": "choice",
          "text": "\"You_____here before?\" \"Yes, I_____my holidays here last year.",
          "options": {
            "A": "Were/spent",
            "B": "Have you been/spent",
            "C": "Were/had spent",
            "D": "Have you been/have spent"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 16,
          "type": "choice",
          "text": "\"You have just missed the last train.\" \"Never mind, I_____.\"",
          "options": {
            "A": "will walk",
            "B": "was walking",
            "C": "am walking",
            "D": "am going to walk"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 17,
          "type": "choice",
          "text": "I_____my sister in April as planned.",
          "options": {
            "A": "have seen",
            "B": "will see",
            "C": "am going to see",
            "D": "see"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 18,
          "type": "choice",
          "text": "Then about a year ago, he_____and I_____from him since.",
          "options": {
            "A": "has disappeared/haven’t never heard",
            "B": "has disappeared/never heard",
            "C": "disappeared/ have never heard",
            "D": "was disappeared/had never heard"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 19,
          "type": "choice",
          "text": "After the guests_____she went back into the living-room and _____off the light.",
          "options": {
            "A": "left/switched",
            "B": "had left/switched",
            "C": "had left/had switched",
            "D": "had left/was switching"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 20,
          "type": "choice",
          "text": "When Alice gets here, you_____her to her room?",
          "options": {
            "A": "will you show",
            "B": "did you show",
            "C": "have you shown",
            "D": "are you showing"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 21,
          "type": "choice",
          "text": "As Hugh and I_____down the steps we nearly_____into my father.",
          "options": {
            "A": "came/ran",
            "B": "were coming/ran",
            "C": "had come/ran",
            "D": "came/were running"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 22,
          "type": "choice",
          "text": "If you want to see us, come to Tom's on Sunday. We_____for you there at midday.",
          "options": {
            "A": "will wait",
            "B": "will be waiting",
            "C": "will have waited",
            "D": "will have been waiting"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 23,
          "type": "choice",
          "text": "Come in, please. I_____for you long.",
          "options": {
            "A": "have waited",
            "B": "had waited",
            "C": "have been waiting",
            "D": "waited"
          },
          "answer": "C",
          "explanation": "Đáp án đúng là C"
        },
        {
          "num": 24,
          "type": "choice",
          "text": "For a moment after their son_____the room, Mr and Mrs Smith merely _____ and _____ at each other.",
          "options": {
            "A": "had left/had stood/looked",
            "B": "had left/stood/looked",
            "C": "left/stood/looked",
            "D": "had left/had stood/had looked"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 25,
          "type": "choice",
          "text": "When we_____in London tonight, it_____.",
          "options": {
            "A": "arrived/was probably raining",
            "B": "arrive/ will be probably raining",
            "C": "arrived/had been probably raining",
            "D": "arrive/ will have probably rained"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 26,
          "type": "choice",
          "text": "I'm afraid I must ask you both what_____yesterday at 10:20 p.m.",
          "options": {
            "A": "did you do",
            "B": "had you done",
            "C": "you were doing",
            "D": "were you doing"
          },
          "answer": "D",
          "explanation": "Đáp án đúng là D"
        },
        {
          "num": 27,
          "type": "choice",
          "text": "There_____great changes in our village in the past few years.",
          "options": {
            "A": "have been",
            "B": "had been",
            "C": "was",
            "D": "has been"
          },
          "answer": "A",
          "explanation": "Đáp án đúng là A"
        },
        {
          "num": 28,
          "type": "choice",
          "text": "The noise from the trains_____me terribly last night.",
          "options": {
            "A": "was annoyed",
            "B": "annoyed",
            "C": "has annoyed",
            "D": "had annoyed"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 29,
          "type": "choice",
          "text": "Listen to this! I think this news_____you.",
          "options": {
            "A": "surprises",
            "B": "will surprise",
            "C": "surprised",
            "D": "would surprise"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        },
        {
          "num": 30,
          "type": "choice",
          "text": "By the end of this month, I hope I_____200 pages of my new novel.",
          "options": {
            "A": "had written",
            "B": "will have written",
            "C": "will have been writing",
            "D": "have written"
          },
          "answer": "B",
          "explanation": "Đáp án đúng là B"
        }
      ]
    }
  ]
};