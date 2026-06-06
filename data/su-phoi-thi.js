window['su-phoi-thi_data'] = {
  "tenses": [
    {
      "id": 1,
      "name": "Phối thì với WHEN",
      "usage": "diễn tả mối quan hệ thời gian giữa các hành động bằng cách dùng liên từ WHEN.",
      "formula": {
        "custom": true,
        "rules": [
          {
            "title": "Diễn tả hành động xảy ra nối tiếp nhau",
            "past": "WHEN + S + V(quá khứ đơn) , S + V(quá khứ đơn)",
            "past_eg": "When he saw me, he smiled at me.",
            "future": "WHEN + S + V(hiện tại đơn) , S + V(tương lai đơn)",
            "future_eg": "When I see him, I will remind him to call you."
          },
          {
            "title": "Diễn tả một hành động đang xảy ra thì có hành động khác xen vào",
            "past": "WHEN + S + V(quá khứ đơn) , S + V(quá khứ tiếp diễn)",
            "past_eg": "When I came to see her, she was cooking dinner.",
            "future": "WHEN + S + V(hiện tại đơn) , S + V(tương lai tiếp diễn)",
            "future_eg": "When you come in, your boss will be waiting for you there."
          },
          {
            "title": "Diễn tả một hành động xảy ra xong trước một hành động khác",
            "past": "WHEN + S + V(quá khứ đơn) , S + V(quá khứ hoàn thành)",
            "past_eg": "When I arrived at the airport, the plane had taken off.",
            "future": "WHEN + S + V(hiện tại đơn) , S + V(tương lai hoàn thành)",
            "future_eg": "When you return to the town, they will have finished building a new bridge."
          }
        ]
      },
      "signals": "WHEN"
    },
    {
      "id": 2,
      "name": "Phối thì với AS SOON AS",
      "usage": "ngay khi hành động này xảy ra thì hành động khác cũng xảy ra.",
      "formula": {
        "custom": true,
        "rules": [
          {
            "title": "Diễn tả hành động xảy ra nối tiếp nhau",
            "past": "AS SOON AS + S + V(quá khứ đơn) , S + V(quá khứ đơn)",
            "past_eg": "As soon as she saw a mouse, she shouted and ran away.",
            "future": "AS SOON AS + S + V(hiện tại đơn / hiện tại hoàn thành) , S + V(tương lai đơn)",
            "future_eg": "I will call you as soon as I have finished / finish the work."
          }
        ]
      },
      "signals": "AS SOON AS"
    },
    {
      "id": 3,
      "name": "Phối thì với SINCE",
      "usage": "diễn tả hành động kéo dài từ một mốc thời gian trong quá khứ cho đến hiện tại.",
      "formula": {
        "custom": true,
        "rules": [
          {
            "title": "Diễn tả nghĩa \"từ khi\"",
            "formula": "S + V(hiện tại hoàn thành) + SINCE + V(quá khứ đơn)",
            "eg": "We have known each other since we were at high school."
          }
        ]
      },
      "signals": "SINCE"
    },
    {
      "id": 4,
      "name": "Phối thì với BY + TIME",
      "usage": "diễn tả hành động kết thúc tính đến một điểm nào đó trong quá khứ hoặc tương lai.",
      "formula": {
        "custom": true,
        "rules": [
          {
            "title": "Tính đến một điểm trong quá khứ",
            "formula": "BY + trạng từ quá khứ + S + V(quá khứ hoàn thành)",
            "eg": "By last month, we had worked for the company for 9 years."
          },
          {
            "title": "Tính đến một điểm trong tương lai",
            "formula": "BY + trạng từ tương lai + S + V(tương lai hoàn thành)",
            "eg": "By next month, we will have worked for the company for 9 years."
          }
        ]
      },
      "signals": "BY"
    },
    {
      "id": 5,
      "name": "Phối thì với AT THIS/THAT TIME",
      "usage": "diễn tả hành động đang xảy ra tại một thời điểm xác định trong quá khứ hoặc tương lai.",
      "formula": {
        "custom": true,
        "rules": [
          {
            "title": "Thời điểm xác định trong quá khứ",
            "formula": "AT THIS/THAT TIME + trạng từ quá khứ + S + V(quá khứ tiếp diễn)",
            "eg": "At this time last week, we were preparing for Tet."
          },
          {
            "title": "Thời điểm xác định trong tương lai",
            "formula": "AT THIS/THAT TIME + trạng từ tương lai + S + V(tương lai tiếp diễn)",
            "eg": "At this time next week, we will be having a big party in the garden."
          }
        ]
      },
      "signals": "AT THIS TIME\nAT THAT TIME"
    },
    {
      "id": 6,
      "name": "Phối thì với BY THE TIME",
      "usage": "cho tới lúc, cho tới khi một hành động khác xảy ra.",
      "formula": {
        "custom": true,
        "rules": [
          {
            "title": "Trong quá khứ",
            "formula": "BY THE TIME + S + V(quá khứ đơn) , S + V(quá khứ hoàn thành)",
            "eg": "By the time she got home, everyone had gone to bed."
          },
          {
            "title": "Trong tương lai",
            "formula": "BY THE TIME + S + V(hiện tại đơn) , S + V(tương lai hoàn thành)",
            "eg": "By the time she gets home, everyone will have gone to bed."
          }
        ]
      },
      "signals": "BY THE TIME"
    },
    {
      "id": 7,
      "name": "Phối thì với AFTER",
      "usage": "diễn tả hành động xảy ra xong rồi mới tới hành động khác.",
      "formula": {
        "custom": true,
        "rules": [
          {
            "title": "Trong quá khứ (hành động xảy ra trước chia quá khứ hoàn thành)",
            "formula": "AFTER + S + V(quá khứ hoàn thành) , S + V(quá khứ đơn)",
            "eg": "After she had done her homework, she went out for a walk."
          },
          {
            "title": "Trong tương lai",
            "formula": "AFTER + S + V(hiện tại hoàn thành) , S + V(hiện tại đơn)",
            "eg": "After she has done her homework, she goes out for a walk."
          }
        ]
      },
      "signals": "AFTER"
    },
    {
      "id": 8,
      "name": "Phối thì với BEFORE",
      "usage": "diễn tả hành động xảy ra xong trước khi có hành động khác tới.",
      "formula": {
        "custom": true,
        "rules": [
          {
            "title": "Trong quá khứ",
            "formula": "BEFORE + S + V(quá khứ đơn) , S + V(quá khứ hoàn thành)",
            "eg": "Before she went to bed, she had locked all the doors."
          },
          {
            "title": "Trong tương lai",
            "formula": "BEFORE + S + V(hiện tại đơn) , S + V(tương lai hoàn thành)",
            "eg": "Hurry up or the film will have ended before we go to the movie."
          }
        ]
      },
      "signals": "BEFORE"
    },
    {
      "id": 9,
      "name": "Phối thì với UNTIL/TILL",
      "usage": "diễn tả nghĩa \"cho tới khi\".",
      "formula": {
        "custom": true,
        "rules": [
          {
            "title": "Công thức phối thì",
            "formula": "S + V(tương lai đơn) / V(bare) / DON'T + V(bare) + UNTIL/TILL + S + V(hiện tại đơn / hiện tại hoàn thành)",
            "eg": "I will wait for you until it is possible.\nWait here until I come back."
          }
        ]
      },
      "signals": "UNTIL\nTILL"
    }
  ],
  "exercises": [
    {
      "name": "Exercise 1",
      "description": "Give the correct forms of the verbs in brackets.",
      "questions": [
        {
          "num": 1,
          "type": "fill",
          "text": "When I ________________ (see) you tomorrow, I ________________ (tell) you my news.",
          "answer": "see / will tell",
          "explanation": "Căn cứ vào cách dùng của “when” khi diễn tả hai hành động xảy ra nối tiếp nhau (trong tương lai). - Trong câu có trạng từ “tomorrow” mang ý chỉ tương lai nên ta dùng cấu trúc: When S + V (hiện tại đơn), S + V (tương lai đơn). – Tạm dịch: Khi tôi đến gặp bạn vào ngày mai, tôi sẽ nói cho bạn tin tức mới của tôi."
        },
        {
          "num": 2,
          "type": "fill",
          "text": "By the end of the month the estate agent________________ (sell) twenty houses.",
          "answer": "will have sold",
          "explanation": "Căn cứ vào cách dùng của “by”: by + trạng từ thời gian tương lai => chia thì tương lai hoàn thành; “the end of month”: cuối tháng này là “mốc thời gian trong tương lai”. – Tạm dịch: Vào cuối tháng này người kinh doanh bất động sản sẽ bán 20 ngôi nhà."
        },
        {
          "num": 3,
          "type": "fill",
          "text": "When I ________________ (wait) for the bus, I saw my close friend.",
          "answer": "was waiting",
          "explanation": "Căn cứ vào cách dùng của “when” khi diễn tả hành động đang xảy ra thì có hành động khác xen vào (trong quá khứ), ta có cấu trúc: When S + V (quá khứ tiếp diễn), S + V (quá khứ đơn). Vế không chứa “when” chia thì quá khứ đơn => Vế còn lại chia thì quá khứ tiếp diễn. – Tạm dịch: Khi tôi đang chờ xe buýt, tôi đã nhìn thấy bạn thân của tôi."
        },
        {
          "num": 4,
          "type": "fill",
          "text": "She ________________ (study) English since she ________________ (be) four years old.",
          "answer": "has studied / was",
          "explanation": "Căn cứ vào cách dùng của “since”, ta có cấu trúc: S + V (hiện tại hoàn thành) since S + V (quá khứ đơn). – Tạm dịch: Cô ấy đã học tiếng anh từ khi cô ấy bốn tuổi."
        },
        {
          "num": 5,
          "type": "fill",
          "text": "We ________________ (study) while they are going out.",
          "answer": "are studying",
          "explanation": "Tạm dịch: Chúng tôi đang học bài trong khi họ đang đi chơi. => Diễn tả hai hành động xảy ra song song đồng thời với nhau ta chia thì tiếp diễn => Căn cứ vào động từ trong mệnh đề trạng ngữ chỉ thời gian đang chia thì hiện tại tiếp diễn"
        },
        {
          "num": 6,
          "type": "fill",
          "text": "As soon as we________________ (get) there, we ________________ (phone) for a taxi.",
          "answer": "get / will phone",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: As soon as + S + V (hiện tại đơn / hiện tại hoàn thành), S + V (tương lai đơn). – Dịch: Ngay khi chúng tôi đến đó, chúng tôi sẽ gọi một chiếc tắc xi."
        },
        {
          "num": 7,
          "type": "fill",
          "text": "He ________________ (see) 10 mice when he ________________ (come) into the room.",
          "answer": "saw / came",
          "explanation": "Căn cứ vào cách dùng của “when” khi diễn tả hai hành động xảy ra nối tiếp nhau trong quá khứ, ta có cấu trúc: When S + V (quá khứ đơn), S + V (quá khứ đơn). Hai hành động nối tiếp nhau: bước vào phòng => nhìn thấy mười con chuột. – Dịch: Anh ấy đã nhìn thấy mười con chuột khi anh ấy bước vào phòng."
        },
        {
          "num": 8,
          "type": "fill",
          "text": "We went home when we ________________ (finish) our work.",
          "answer": "had finished",
          "explanation": "Căn cứ vào cách dùng của “when” khi diễn tả hành động này xảy ra xong mới đến hành động khác, ta có cấu trúc: When S + V (quá khứ hoàn thành), S + V (quá khứ đơn). Vế không chứa “when” chia thì quá khứ đơn => Vế chứa “when” chia thì quá khứ hoàn thành. => Vì theo ngữ cảnh, hoàn thành công việc trước rồi mới về nhà. – Tạm dịch: Chúng tôi sẽ về nhà khi chúng tôi đã hoàn thành công việc của mình."
        },
        {
          "num": 9,
          "type": "fill",
          "text": "When I was going to the door, the phone ________________ (ring).",
          "answer": "rang",
          "explanation": "Căn cứ vào cách dùng của “when” khi diễn tả hành động đang xảy ra thì có hành động khác xen vào (trong quá khứ), ta có cấu trúc: When S + V (quá khứ tiếp diễn), S + V (quá khứ đơn). Vế chứa “when” chia thì quá khứ tiếp diễn => Vế còn lại chia thì quá khứ đơn. – Tạm dịch: Khi chúng tôi đang đi đến cửa, điện thoại đã reo."
        },
        {
          "num": 10,
          "type": "fill",
          "text": "I will go to the library before I ________________ (do) the shopping.",
          "answer": "do",
          "explanation": "Dịch nghĩa: Tôi sẽ đi đến thư viện trước khi tôi đi mua sắm. => Cả 2 hành động “đi đến thư viện” và “đi mua sắm” đều là những hành động sẽ xảy ra trong tương lai. Ta có quy tắc: Sau mệnh đề trạng ngữ chỉ thời gian + S + V(hiện tại đơn) => diễn tả hành động của tương lai"
        },
        {
          "num": 11,
          "type": "fill",
          "text": "At this time last night, I ____________ (learn) while my father _____________ (watch) TV.",
          "answer": "was learning / was watching",
          "explanation": "Căn cứ vào cách dùng của “at this time”: At this time + thời gian trong quá khứ => chia thì quá khứ tiếp diễn; “last night”: tối qua là “mốc thời gian trong quá khứ”. – Tạm dịch: Vào thời điểm này tối qua, tôi đang học bài trong khi bố của tôi đang xem TV."
        },
        {
          "num": 12,
          "type": "fill",
          "text": "He ________________ (watch) TV when I come to see him.",
          "answer": "will be watching",
          "explanation": "Căn cứ vào cách dùng của “when” khi diễn tả hành động đang xảy ra có hành động khác xen vào (trong tương lai), ta dùng cấu trúc: When + S (hiện tại đơn), S + V (tương lai tiếp diễn). – Tạm dịch: Khi tôi đến gặp anh ấy, thì anh ấy sẽ đang xem TV."
        },
        {
          "num": 13,
          "type": "fill",
          "text": "He ___________ (live) in New York for 4 years before he ___________ (move) to New York.",
          "answer": "had lived / moved",
          "explanation": "Căn cứ vào cách dùng của “before” khi diễn tả hành động xảy ra trước một hành động trong quá khứ, ta có cấu trúc: Before S + V (quá khứ đơn), S + V (quá khứ hoàn thành).– Tạm dịch: Anh ấy đã sống ở New York được 4 năm trước khi anh ấy rời khỏi đó."
        },
        {
          "num": 14,
          "type": "fill",
          "text": "We ________________ (send) a report as soon as we ________________ (finish) our work.",
          "answer": "will send / have finished | will send / finish",
          "explanation": "Căn cứ vào cách dùng của “as soon as”, ta có cấu trúc: As soon as + S + V (hiện tại đơn / hiện tại hoàn thành), S + V (tương lai đơn). – Tạm dịch: Chúng tôi sẽ gửi báo cáo ngay sau khi chúng tôi hoàn thành công việc của mình."
        },
        {
          "num": 15,
          "type": "fill",
          "text": "We ________________ (wait) here until the rain ________________ (stop).",
          "answer": "will wait / stops | will wait / has stopped",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: S + V (tương lai đơn) until S + V (hiện tại đơn/ hiện tại hoàn thành). – Tạm dịch: Chúng tôi sẽ chờ cho đến khi trời dừng mưa."
        },
        {
          "num": 16,
          "type": "fill",
          "text": "He will go home as soon as he ________________ (finish) his work.",
          "answer": "has finished",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: As soon as + S + V (hiện tại đơn / hiện tại hoàn thành), S + V (tương lai đơn). - Vế không chứa “as soon as” chia tương lai đơn => Vế còn lại chia thì hiện tại đơn/hiện tại hoàn thành. => Do “finish” bản thân đã mang ý nghĩa là hoàn thành nên ta ưu tiên chia hiện tại hoàn thành – Tạm dịch: Anh ta sẽ về nhà ngay khi anh ta hoàn thành công việc của mình."
        },
        {
          "num": 17,
          "type": "fill",
          "text": "At 11:30 tomorrow, we ________________ (have) lunch in our friend’s house.",
          "answer": "will be having",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: At + giờ + thời gian trong tương lai => chia thì tương lai tiếp diễn. – Tạm dịch: Vào lúc 11 giờ 30 ngày mai, khi bạn đến tôi sẽ đang ăn trưa."
        },
        {
          "num": 18,
          "type": "fill",
          "text": "His health has improved since he ________________ (return) from the hills.",
          "answer": "returned",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: S + V (hiện tại hoàn thành) since S + V (quá khứ đơn). – Tạm dịch: Sức khỏe của anh ấy đã được cải thiện từ khi anh ấy trở lại vùng đồi núi."
        },
        {
          "num": 19,
          "type": "fill",
          "text": "The Chinese ______________ (make) spaghetti dishes for a long time before Marco Polo ______________ (bring) it back to Italy.",
          "answer": "had been making / brought | had made / brought",
          "explanation": "Căn cứ vào cách dùng của “before” khi diễn tả hành động xảy ra sau một hành động trong quá khứ, ta có cấu trúc: Before S + V (quá khứ đơn), S + V (quá khứ hoàn thành). (Có thể dùng thì quá khứ hoàn thành tiếp diễn để nhấn mạnh). – Tạm dịch: Người Trung Quốc đã làm ra mì Ý trước khi Marco Polo mang nó trở lại Ý."
        },
        {
          "num": 20,
          "type": "fill",
          "text": "It is the first time he ________________ (drive) a car.",
          "answer": "has driven",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: It is the first time S + V (hiện tại hoàn thành). – Tạm dịch: Đây là lần đầu tiên anh ấy lái một chiếc xe."
        },
        {
          "num": 21,
          "type": "fill",
          "text": "I understand you ___________________(have) an unpleasant experience at the weekend. What exactly _________________(happen)?",
          "answer": "had / happened",
          "explanation": "Căn cứ vào cách dùng của thì quá đơn: diễn tả hành động đã xảy ra và đã chấm dứt trong quá khứ. – Tạm dịch: Tôi hiểu bạn đã có một trải nghiệm khó chịu vào cuối tuần. Chính xác thì điều gì đã xảy ra vậy?"
        },
        {
          "num": 22,
          "type": "fill",
          "text": "“Good night. It __________ (be) nice to meet you,” he __________(say) and __________(go) off to his car.",
          "answer": "has been / said / went",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại hoàn thành: diễn tả hành động xảy ra trong quá khứ nhưng không đề cập đến xảy ra khi nào. – Tạm dịch: “Chúc ngủ ngon. Thật vui vì đã gặp bạn,” “anh ấy nói và đi ra xe của mình."
        },
        {
          "num": 23,
          "type": "fill",
          "text": "I will graduate in June. I will see you in July. By the time I _______________ (see) you, I ________________ (graduate).",
          "answer": "see / will have graduated",
          "explanation": "Ta có công thức: By the time S + V (hiện tại đơn), S + V (tương lai hoàn thành) – Tạm dịch: Tớ sẽ tốt nghiệp vào tháng sáu. Tớ sẽ gặp cậu vào tháng bảy. Vào thời điểm tớ gặp cậu, tớ đã tốt nghiệp rồi."
        },
        {
          "num": 24,
          "type": "fill",
          "text": "We ________________ (already finish) that work by the time you get back.",
          "answer": "will have already finished",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: By the time S + V (hiện tại đơn), S + V (tương lai hoàn thành). Vế chứa “by the time” chia tương lai đơn => Vế còn lại chia thì tương lai hoàn thành. – Tạm dịch: Vào thời điểm bạn quay trở lại, tôi sẽ đã hoàn thành công việc đó rồi."
        },
        {
          "num": 25,
          "type": "fill",
          "text": "When I arrived at the meeting, the first speaker just________________ (finish) speaking and the audience were clapping.",
          "answer": "had just finished",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: When S + V (quá khứ đơn), S + V (quá khứ hoàn thành) (diễn tả một hành động xảy ra xong mới tới hành động khác). Vế chứa “when” chia thì quá khứ đơn => Vế còn lại chia thì quá khứ hoàn thành. => Vì theo ngữ cảnh, hành động ‘’tôi đến’’ xảy ra sau hành động “mới kết thúc phần nói”. – Dịch: Khi tôi đến cuộc họp, người phát biểu đầu tiên vừa mới kết thúc phần nói và khán giả đang vỗ tay."
        },
        {
          "num": 26,
          "type": "fill",
          "text": "The traffic was very heavy. By the time I ________________ (get) to Mary’s party, everyone ________________ (already arrive).",
          "answer": "got / had already arrived",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: By the time + S + V (quá khứ đơn), S + V (quá khứ hoàn thành). – Tạm dịch: Giao thông rất đông đúc. Vào thời điểm tôi đến bữa tiệc của Mary, mọi người đã đến rồi."
        },
        {
          "num": 27,
          "type": "fill",
          "text": "“You ____________ (find) the key which you ______________(lose) yesterday?” “Yes. I ________________(find) it in the pocket of my other coat.”",
          "answer": "have you found / lost / found",
          "explanation": "Căn cứ vào ngữ cảnh của câu, cách dùng của thì hiện tại hoàn thành: Hành động đã hoàn thành cho tới thời điểm hiện tại mà không đề cập tới nó xảy ra khi nào. => find => have found - Căn cứ vào dấu hiệu trạng từ thời gian “yesterday” nên vế mệnh đề quan hệ phải chia ở quá khứ đơn: lose => lost - Hành động “find” đã xảy ra và kết thúc trong quá khứ nên: find => found – Tạm dịch: Bạn đã tìm thấy chìa khóa bạn đã làm mất tối qua chưa? “Rồi, tôi đã tìm thấy nó ở trong túi áo khoác của tôi.”"
        },
        {
          "num": 28,
          "type": "fill",
          "text": "Tomorrow I’m going to leave for home. When I _______________ (arrive) at the airport, Mary _______________ (wait) for me.",
          "answer": "arrive / will be waiting",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: When S + V (hiện tại đơn), S + V (tương lai đơn) (Có thể dùng thì tương lai tiếp diễn để nhấn mạnh). – Tạm dịch: Ngày mai tôi sẽ rời nhà. Khi tôi đến sân bay, Mary sẽ đang chờ tôi."
        },
        {
          "num": 29,
          "type": "fill",
          "text": "Sarah has lost passport again. It is the second time this ________________ (happen).",
          "answer": "has happened",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: It is the first/second/third time S + V (hiện tại hoàn thành). – Tạm dịch: Sarah lại mất hộ chiếu nữa. Đây là lần thứ hai điều này đã xảy ra."
        },
        {
          "num": 30,
          "type": "fill",
          "text": "When the alarm rang, Jack ________________ (jump) out of bed quickly.",
          "answer": "jumped",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: When S + V (quá khứ đơn), S + V (quá khứ đơn). => Diễn tả hành động xảy ra nối tiếp nhau trong quá khứ– Tạm dịch: Khi chuông reo, Jack nhanh chóng bật dậy ra khỏi giường."
        },
        {
          "num": 31,
          "type": "fill",
          "text": "It’s no use getting impatient. The plane ______________ (not arrive) until the weather _____________(clear) up.",
          "answer": "won’t arrive / clears",
          "explanation": "Căn cứ vào mệnh đề trạng ngữ chỉ thời gian: S + V (tương lai đơn) + until S + V (hiện tại đơn/ hiện tại hoàn thành).– Tạm dịch: Không làm sao phải mất kiên nhẫn thế. Máy bay sẽ không tới cho đến khi thời tiết cải thiện hơn."
        },
        {
          "num": 32,
          "type": "fill",
          "text": "John and I ____________ (study) at the same school and we ___________(be) great friends ever since.",
          "answer": "studied / have been",
          "explanation": "Căn cứ vào trạng từ “ever since” ta chia thì hiện tại hoàn thành. – Dịch nghĩa của câu: “John và tôi học ở cùng trường.” Ta chia thì quá khứ đơn: Study => studied – Tạm dịch: John và tôi học cùng trường và là những người bạn tốt kể từ đó đến nay."
        },
        {
          "num": 33,
          "type": "fill",
          "text": "Don’t wait up for me. I can’t tell when I ______________(be) back.",
          "answer": "will be",
          "explanation": "Tạm dịch: Không phải đợi tôi đâu. Tôi không thể nói khi nào tôi sẽ quay lại. => Lưu ý là ở đây có “when” nhưng ta dùng tương lai đơn “will be”, vì nó là mệnh đề danh từ, không phải là mệnh đề trạng ngữ chỉ thời gian."
        },
        {
          "num": 34,
          "type": "fill",
          "text": "Here you are! What you ___________(do) here at this time of night?",
          "answer": "are you doing",
          "explanation": "Căn cứ vào dấu hiệu: at this time of night => ngữ cảnh ở thì hiện tại – Tạm dịch: Đây này! Bạn đang làm gì ở đây vào thời điểm này của đêm thế?"
        },
        {
          "num": 35,
          "type": "fill",
          "text": "Good-bye, Ned. I never ____________(forget) you. I _____________(miss) you more than anyone I ever_____________ (know) in my life.",
          "answer": "will never forget / will miss / have ever known",
          "explanation": "Căn cứ vào nghĩa của câu. – Tạm dịch: Tạm biệt, Ned. Tôi sẽ không bao giờ quên bạn đâu. Tôi sẽ nhớ bạn nhiều hơn bất cứ ai tôi đã từng biết trong cuộc đời mình."
        },
        {
          "num": 36,
          "type": "fill",
          "text": "The secretary_____________ (type) all the documents long before the manager comes.",
          "answer": "will have typed",
          "explanation": "Căn cứ theo cấu trúc: Before + S + V (hiện tại đơn), S + V (tương lai hoàn thành). – Tạm dịch: Thư kí sẽ đánh máy tất cả các tài liệu xong trước khi người quản lí đến."
        },
        {
          "num": 37,
          "type": "fill",
          "text": "You see, I ____________(do) this kind of thing for the last 30 years.",
          "answer": "have done | have been doing",
          "explanation": "Căn cứ vào dấu hiệu nhận biết của thì hiện tại hoàn thành: for + khoảng thời gian.– Tạm dịch: Bạn thấy đấy, tôi đã làm công việc này trong suốt 30 năm rồi. * Lưu ý: Khi người ta muốn nhấn mạnh kết quả của hành động => dùng thì hoàn thành Khi người ta muốn nhấn mạnh quá trình của hành động => dùng thì hoàn thành tiếp diễn"
        },
        {
          "num": 38,
          "type": "fill",
          "text": "When we ____________(get) to the restaurant, we _____________(find) that nobody _____________(remember) to reserve a table.",
          "answer": "got / found / had remembered",
          "explanation": "Tạm dịch: Khi chúng tôi đến nhà hàng, chúng tôi thấy rằng không ai nhớ đặt trước bàn. Giải thích: - đến nhà hàng rồi mới thấy => hành động xảy ra nối tiếp nhau => chia thì quá khứ đơn - thấy rằng không ai nhớ đặt bàn trước => hành động phải nhớ đặt bàn xảy ra trước hành động thấy => chia thì quá khứ hoàn thành"
        },
        {
          "num": 39,
          "type": "fill",
          "text": "I could tell at a glance that the pile of letters on my desk ______________(disturb) while I ___________(be) out.",
          "answer": "had been disturbed / was",
          "explanation": "Tạm dịch: Tôi có thể nói rằng trong nháy mắt đống thư trên bàn của tôi đã bị xáo trộn trong lúc tôi ra ngoài. - lúc mà tôi thấy thì đống thư đã bị xáo trộn rồi => việc “thư bị xáo trộn” xảy ra trước khi tôi thấy. => chia thì quá khứ hoàn thành. - Việc đống thư bị xáo trộn xảy ra lúc tôi ra ngoài, do đó mệnh đề trạng ngữ chỉ thời gian chia thì quá khứ đơn."
        },
        {
          "num": 40,
          "type": "fill",
          "text": "As soon as she arrived England, she _____________(find) that the language _________(be) quite different from the English that she _______________(learn) at school.",
          "answer": "found / was / had learnt",
          "explanation": "Tạm dịch: Ngay khi cô ấy đến nước Anh, cô ấy thấy rằng ngôn ngữ thì khá khác tiếng anh mà cô ấy đã học ở trường. - việc “học” xảy ra trước. => chia thì quá khứ hoàn thành. - “thấy nó khác với tiếng anh đã học ở trường” xảy ra sau. => chia thì quá khứ đơn."
        }
      ]
    },
    {
      "name": "Exercise 2",
      "description": "Choose the best answer to complete each following sentence.",
      "questions": [
        {
          "num": 1,
          "type": "choice",
          "text": "The manager ________________ the store before I arrived.",
          "options": {
            "A": "closed",
            "B": "had closed",
            "C": "has closed",
            "D": "was closed"
          },
          "answer": "B",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: Before S + V (quá khứ đơn), S + V (quá khứ hoàn thành). Vế chứa “before” chia thì quá khứ đơn => Vế còn lại chia thì quá khứ hoàn thành. – Tạm dịch: Người quản lí đã đóng cửa trước khi tôi đến."
        },
        {
          "num": 2,
          "type": "choice",
          "text": "When we see Mr. Minh tomorrow, I ________________ him of that.",
          "options": {
            "A": "will remind",
            "B": "remind",
            "C": "have reminded",
            "D": "reminded"
          },
          "answer": "A",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: When S + V (hiện tại đơn), S + V (tương lai đơn). Vế chứa “when” chia thì hiện tại đơn => Vế còn lại chia thì tương lai đơn. – Tạm dịch: Ngày mai khi chúng tôi gặp ông Minh, tôi sẽ nhắc nhở ông ấy về điều đó."
        },
        {
          "num": 3,
          "type": "choice",
          "text": "When I got home I found that water ________________ down the kitchen walls.",
          "options": {
            "A": "ran",
            "B": "was running",
            "C": "has run",
            "D": "had been running"
          },
          "answer": "B",
          "explanation": "Dịch: Khi tôi về nhà tôi thấy nước đang chảy xuống tường nhà bếp. . Diễn tả hành động “nước chảy” diễn ra tại thời điểm nói “lúc mà tôi về nhà”. Ở đây, có thể ngầm hiểu việc nước chảy đã xảy ra từ trước rồi, cụ thể từ lúc nào không rõ nhưng nó đã và đang diễn ra cho đến khi tôi về, và tại thời điểm tôi về đó là hành động “run down” cần chia đang diễn ra, nên ta chia ở quá khứ tiếp diễn. chưa chính xác. Vì dùng thì quá khứ hoàn thành tiếp diễn để diễn tả một hành động đã xảy ra và kéo dài liên tục đến một hành động hoặc một thời điểm nào đó trong quá khứ và chấm dứt tại thời điểm đó. Tức là nếu chia theo, ta hiểu tại thời điểm nói, lúc mà “tôi về”, nước đã không còn chảy nữa, như vậy lại mâu thuẫn với giả thiết là \"tôi thấy nước đang chảy’’. -> Vì dùng “I found” cho thấy bản thân họ đã chứng kiến điều gì đó đang diễn ra, nên lúc đó họ mới về thì họ không thể nào “thấy được việc nước chảy liên tục từ trước đó đến lúc họ về” được. *Note: Nếu ngữ cảnh là như ví dụ này, ta sẽ chia quá khứ hoàn thành tiếp diễn cho hành động tương tự: EX: The water had been running down the kitchen walls and I found that they were still wet."
        },
        {
          "num": 4,
          "type": "choice",
          "text": "After he _____________ his English course, he went to England to continue his study.",
          "options": {
            "A": "has finish",
            "B": "had finished",
            "C": "was finished",
            "D": "would finish"
          },
          "answer": "B",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: After S + V (quá khứ hoàn thành), S + V (quá khứ đơn). Vế không chứa “after” chia thì quá khứ đơn => Vế còn lại chia thì quá khứ hoàn thành. – Dịch: Sau khi anh ấy hoàn thành khóa học tiếng anh, anh ấy đã đi đến nước Anh để tiếp tục việc học của mình."
        },
        {
          "num": 5,
          "type": "choice",
          "text": "While my father ________________ a film on TV, my mother was cooking dinner.",
          "options": {
            "A": "watched",
            "B": "was watching",
            "C": "had watched",
            "D": "watches"
          },
          "answer": "B",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: While S + V (quá khứ tiếp diễn), S + V (quá khứ tiếp diễn). (Diễn tả hai hành động xảy ra song song cùng lúc trong quá khứ). Vế không chứa “while” chia thì quá khứ tiếp diễn => Vế còn lại chia thì quá khứ tiếp diễn. – Dịch: Trong khi bố của tôi đang xem phim trên TV, mẹ của tôi đang nấu ăn."
        },
        {
          "num": 6,
          "type": "choice",
          "text": "I don’t think he ____________in the thirty years I _______________ him.",
          "options": {
            "A": "had changed/have known",
            "B": "has changed/have known",
            "C": "had changed/had known",
            "D": "has changed/knew"
          },
          "answer": "B",
          "explanation": "Dịch: Tôi không nghĩ anh ta đã thay đổi trong vòng 30 năm tôi biết anh ấy. => Tôi đã biết anh ấy trong khoảng 30 năm tính đến thời điểm nói và trong vòng 30 năm ấy anh ấy đã thay đổi. => Dùng thì hiện tại hoàn thành"
        },
        {
          "num": 7,
          "type": "choice",
          "text": "When I came to visit her last night, she ________________ a bath.",
          "options": {
            "A": "is having",
            "B": "was having",
            "C": "has had",
            "D": "had had"
          },
          "answer": "B",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: When S + V (quá khứ đơn), S + V (quá khứ tiếp diễn). ( Diễn tả một hành động đang xảy ra thì có hành động khác xen vào). Vế chứa “when” chia thì quá khứ đơn => Vế còn lại chia thì quá khứ tiếp diễn. – Dịch: Khi tôi đến thăm cô ấy tối qua, cô ấy đang tắm."
        },
        {
          "num": 8,
          "type": "choice",
          "text": "Tom ________________ before we arrive there.",
          "options": {
            "A": "has left",
            "B": "had left",
            "C": "will have left",
            "D": "leaves"
          },
          "answer": "C",
          "explanation": "Dịch: Tom sẽ rời đi trước khi chúng tôi đến đó. Ta thấy: - Before + S + V(hiện tại đơn) -> hành động chưa xảy ra. Do đó, ta loại A, B - Căn cứ vào nghĩa của câu: Hành động \" tôi rời đi\" sẽ xảy ra xong trước hành động \"chúng tôi tới\". -> chia thì tương lai hoàn thành."
        },
        {
          "num": 9,
          "type": "choice",
          "text": "He _______________ his Chinese course before he went to China to continue his business.",
          "options": {
            "A": "will finish",
            "B": "has finished",
            "C": "had finished",
            "D": "will have finished"
          },
          "answer": "C",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: Before S + V (quá khứ đơn), S + V (quá khứ hoàn thành). Vế chứa “before” chia thì quá khứ đơn => Vế còn lại chia thì quá khứ hoan thành. – Dịch: Anh ấy đã hoàn thành khóa học tiếng Trung Quốc trước khi anh ấy đến Trung Quốc để tiếp tục công việc kinh doanh của mình."
        },
        {
          "num": 10,
          "type": "choice",
          "text": "Please send us a postcard as soon as you ________________ in London.",
          "options": {
            "A": "will arrive",
            "B": "is going to arrive",
            "C": "arrive",
            "D": "arrived"
          },
          "answer": "C",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: V (nguyên dạng)/Don’t + V (nguyên dạng) + until/As soon as + S + V (hiện tại đơn/ hiện tại hoàn thành). – Dịch: Hãy gửi cho chúng tôi bưu thiếp ngay sau khi bạn đến London."
        },
        {
          "num": 11,
          "type": "choice",
          "text": "I ______________ you this book when I meet you tomorrow.",
          "options": {
            "A": "give",
            "B": "will give",
            "C": "is giving",
            "D": "has given"
          },
          "answer": "B",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: When S + V (hiện tại đơn), S + V (tương lai đơn). Vế chứa “when” chia thì hiện tại đơn => Vế còn lại chia thì tương lai đơn. – Dịch: Tôi sẽ cho bạn cuốn sách này khi tôi gặp bạn ngày mai."
        },
        {
          "num": 12,
          "type": "choice",
          "text": "We _______________ for going home when it began to rain.",
          "options": {
            "A": "were preparing",
            "B": "are preparing",
            "C": "will be preparing",
            "D": "have prepared"
          },
          "answer": "A",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: When S + V (quá khứ đơn), S + V (quá khứ tiếp diễn). Vế chứa “when” chia thì quá khứ đơn => Vế còn lại chia thì quá khứ tiếp diễn. – Dịch: Chúng tôi đang chuẩn bị về nhà thì trời mưa."
        },
        {
          "num": 13,
          "type": "choice",
          "text": "John _________________ in the same house since he left school.",
          "options": {
            "A": "lived",
            "B": "had lived",
            "C": "was living",
            "D": "has lived"
          },
          "answer": "D",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: S + V (hiện tại hoàn thành) + since + S + V (quá khứ đơn). – Dịch: John đã sống ở cùng căn nhà đó kể từ khi anh ấy rời trường."
        },
        {
          "num": 14,
          "type": "choice",
          "text": "I had prepared dinner before I __________________ to work.",
          "options": {
            "A": "went",
            "B": "was going",
            "C": "had gone",
            "D": "is going"
          },
          "answer": "A",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: Before S + V (quá khứ đơn), S + V (quá khứ hoàn thành). Vế không chứa “before” chia thì quá khứ hoàn thành => Vế còn lại chia thì quá đơn. – Dịch: Tôi đã chuẩn bị bữa tối trước khi tôi đi làm."
        },
        {
          "num": 15,
          "type": "choice",
          "text": "When she came into the hall, she ________________ her arms to the audience, smiled and bowed deeply.",
          "options": {
            "A": "opened",
            "B": "had opened",
            "C": "was opening",
            "D": "is opening"
          },
          "answer": "A",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: When S + V (quá khứ đơn), S + V (quá khứ đơn). (diễn tả hai hành động xảy ra nối tiếp nhau trong quá khứ). – Dịch: Khi cô ấy bước vào hội trường, cô ấy đã dang ta ra với khán giả, cười và cúi đầu."
        },
        {
          "num": 16,
          "type": "choice",
          "text": "I have never played badminton before. This is the first time I _____ to play it.",
          "options": {
            "A": "try",
            "B": "tried",
            "C": "have tried",
            "D": "am trying"
          },
          "answer": "C",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: It is the first time S + V: đó là lần đầu tiên ai đó làm gì -> chia hiện tại hoàn thành vì diễn tả một hành động từ trong quá khứ tính đến thời điểm hiện tại thì như thế nào – Dịch: Tôi chưa từng chơi cầu lông trước đây. Đây là lần đầu tiên tôi chơi cầu lông."
        },
        {
          "num": 17,
          "type": "choice",
          "text": "The car ___________________ ready for him by the time he comes tomorrow.",
          "options": {
            "A": "will be",
            "B": "will have been",
            "C": "will being",
            "D": "are going to be"
          },
          "answer": "B",
          "explanation": "* Căn cứ vào mệnh đề trạng ngữ chỉ thời gian: By the time S + V (hiện tại đơn), S + V (tương lai hoàn thành). * Vế chứa “by the time” chia thì hiện tại đơn => Vế còn lại chia thì tương lai hoàn thành. * Dịch: Ngày mai vào lúc anh ấy đến, chiếc xe sẽ sẵn sàng cho anh ấy."
        },
        {
          "num": 18,
          "type": "choice",
          "text": "He greeted her. She really __________ better than when he ______ her last. Yes, she_____________.",
          "options": {
            "A": "looked/saw/had changed",
            "B": "looked/saw/changed",
            "C": "looked/had seen/had changed",
            "D": "had looked/had seen/had changed"
          },
          "answer": "C",
          "explanation": "* Dịch nghĩa: Anh ấy chào cô ấy. Cô ấy trông đẹp hơn khi anh ấy nhìn thấy cô lần cuối. Phải, cô ấy đã thay đổi. Giải thích: - \"gặp\" và \"thay đổi\" xảy ra trước. => chia thì quá khứ hoàn thành. - \"trông đẹp hơn\" xảy ra sau. => chia thì quá khứ đơn."
        },
        {
          "num": 19,
          "type": "choice",
          "text": "When I last saw him, he ________________ in London.",
          "options": {
            "A": "has lived",
            "B": "is living",
            "C": "was living",
            "D": "has been living"
          },
          "answer": "C",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: When S + V (quá khứ đơn), S + V (quá khứ tiếp diễn). – Dịch: Khi tôi nhìn thấy anh ấy lần cuối, anh ấy đang sống ở London."
        },
        {
          "num": 20,
          "type": "choice",
          "text": "I sat down at the desk and _________ why my father’s letter ___________ yet. I ___________ to ask him to send me some money at once.",
          "options": {
            "A": "wonder/hasn’t arrive/wrote",
            "B": "wondered/hadn’t arrived/wrote",
            "C": "wondered/hasn’t arrived/wrote",
            "D": "wondered/hadn’t arrived/had written"
          },
          "answer": "D",
          "explanation": "Dịch: Tôi đã ngồi xuống bàn và tự hỏi không biết lá thư của Ba đã đến nơi chưa. Tôi đã viết thư để bảo Ba gửi tiền cho tôi ngay lập tức. + Căn cứ vào động từ “sat” thì các động từ phía sau phải chia thì quá khứ => loại A + Dấu hiệu câu tường thuật: “Wondered + why + S + V(lùi thì)” => Loại C + Ta thấy hành động “lá thư đến” và hành động “viết thư” đều xảy ra trước hành động \" ngồi và tự hỏi\" => Xảy ra trước quá khứ => quá khứ hoàn thành"
        },
        {
          "num": 21,
          "type": "choice",
          "text": "By Christmas, I ________________ for Mr. Smith for six years.",
          "options": {
            "A": "will have been working",
            "B": "will work",
            "C": "have been working",
            "D": "will be working"
          },
          "answer": "A",
          "explanation": "Dịch: Tính tới giáng sinh, tôi sẽ đã làm làm việc cho ông Smit được 6 năm. Ta có: - By + dấu hiệu của quá khứ -> ta chia thì quá khứ hoàn thành. Xét 4không cónào là thì quá khứ hoàn thành. - By + dấu hiệu của tương lai -> ta chia thì tương lai hoàn thành. (Người ta dùng thì tương lai hoàn thành tiếp diễn thay cho thì tương lai hoàn thành để nhấn mạnh tính liên tục của hành động.)"
        },
        {
          "num": 22,
          "type": "choice",
          "text": "I will come and see you before I _________________ for the States.",
          "options": {
            "A": "leave",
            "B": "will leave",
            "C": "have left",
            "D": "shall leave"
          },
          "answer": "A",
          "explanation": "Dịch: Tôi sẽ đến và gặp bạn trước khi tôi rời khỏi Mỹ. => Diễn tả hành động xảy ra trong tương lai => Sau mệnh đề trạng ngữ chỉ thời gian không chia thì tương lai. Do đó, ta loại B, D -> Căn cứ vào nghĩa của câu ta chọn A"
        },
        {
          "num": 23,
          "type": "choice",
          "text": "By the age of 25, he ________________ two famous novels.",
          "options": {
            "A": "wrote",
            "B": "writes",
            "C": "has written",
            "D": "had written"
          },
          "answer": "D",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: By + thời gian quá khứ => chia thì quá khứ hoàn thành. – Dịch: Vào tuổi 25, anh ấy đã viết hai cuốn tiểu thuyết nổi tiếng."
        },
        {
          "num": 24,
          "type": "choice",
          "text": "When her husband was in the army, Mary _________________ to him twice a week",
          "options": {
            "A": "was writing",
            "B": "wrote",
            "C": "was written",
            "D": "had written"
          },
          "answer": "B",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: When S + V (quá khứ đơn), S + V (quá khứ đơn): diễn tả hồi ức, thói quen trong quá khứ => Ở đây có thể hiểu rằng trong lúc chồng đang đi lính thì Mary cũng viết thư thường xuyên cho chồng trong thời gian đó, hai hành động cùng diễn ra song song trong một khoảng thời gian ở quá khứ như một thói quen, nên ta chia hai vế cho quá khứ đơn. – Dịch: Khi chồng cô ấy ở trong quân đội, Mary viết thư cho anh ấy hai lần một tuần."
        },
        {
          "num": 25,
          "type": "choice",
          "text": "I have never played football before. This is the first time I _____ playing.",
          "options": {
            "A": "try",
            "B": "tried",
            "C": "have tried",
            "D": "am trying"
          },
          "answer": "C",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: This is the first time S + V (hiện tại hoàn thành). – Dịch: Tôi chưa bao giờ chơi bóng đá trước đây. Đây là lần đầu tiên tôi thử chơi."
        },
        {
          "num": 26,
          "type": "choice",
          "text": "Since Tom ________________, I have heard nothing from him.",
          "options": {
            "A": "had left",
            "B": "left",
            "C": "has left",
            "D": "was left"
          },
          "answer": "B",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: S + V (hiện tại hoàn thành) since S + V (quá khứ đơn). – Dịch: Từ khi Tom rời đi, tôi chưa nghe tin tức gì từ anh ấy."
        },
        {
          "num": 27,
          "type": "choice",
          "text": "After I _______________ lunch, I looked for my bag.",
          "options": {
            "A": "had",
            "B": "had had",
            "C": "will have had",
            "D": "have had"
          },
          "answer": "B",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: After S + had Vp2, S + V (quá khứ đơn). – Dịch: Sau khi tôi ăn trưa, tôi đã tìm túi của mình."
        },
        {
          "num": 28,
          "type": "choice",
          "text": "By the end of next year, George _________________ English for two years.",
          "options": {
            "A": "will have learned",
            "B": "will learn",
            "C": "has learned",
            "D": "would learn"
          },
          "answer": "A",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: By + trạng từ của tương lai => động từ chia thì tương lai hoàn thành. – Dịch: Vào cuối của năm tới, George đã học tiếng anh trong 2 năm."
        },
        {
          "num": 29,
          "type": "choice",
          "text": "These were the highest words of praise they _______________from the old man.",
          "options": {
            "A": "ever heard",
            "B": "have ever had",
            "C": "had ever had",
            "D": "will have ever heard"
          },
          "answer": "C",
          "explanation": "Dịch nghĩa: Đó là những lời tán dương nhất mà họ nhận được từ người đàn ông đã có tuổi. Căn cứ vào trạng từ \"ever\" thì động từ \"hear\" sẽ chia thì hoàn thành. Căn cứ vào động từ \"were\" thì động từ ở mệnh đề sau phải chia thì quá khứ hoàn thành."
        },
        {
          "num": 30,
          "type": "choice",
          "text": "He will take the dog out for a walk as soon as he __________________ dinner.",
          "options": {
            "A": "finish",
            "B": "finishes",
            "C": "will finish",
            "D": "finishing"
          },
          "answer": "B",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: As soon as + S + V (hiện tại đơn / hiện tại hoàn thành), S + V (tương lai đơn). Vế không chứa “as soon as” chia thì tương lai đơn => Vế còn lại chia thì hiện tại đơn/hiện tại hoàn thành. – Dịch: Anh ấy sẽ đưa con chó đi dạo ngay khi anh ấy ăn xong."
        },
        {
          "num": 31,
          "type": "choice",
          "text": "She __________ the children to her, and ________ the words she ________ to the others.",
          "options": {
            "A": "drew/said/had said",
            "B": "was drawing/said/said",
            "C": "had drawn/had said/said",
            "D": "draws/is saying/has said"
          },
          "answer": "A",
          "explanation": "Dịch nghĩa: Cô ta đã dụ dỗ bọn trẻ lại gần cô ta rồi nói những lời mà cô ta đã nói với những đứa trẻ khác. => Căn cứ vào nghĩa của câu ta có 2 hành động xảy ra nối tiếp nhau: “lôi kéo, dụ dỗ” và \" nói\" => chia thì quá khứ đơn"
        },
        {
          "num": 32,
          "type": "choice",
          "text": "He fell down when he ________________ towards the church.",
          "options": {
            "A": "run",
            "B": "runs",
            "C": "was running",
            "D": "had run"
          },
          "answer": "C",
          "explanation": "Dịch: Anh ấy đã bị ngã khi anh ấy đang chạy về hướng nhà thờ. => Hành động chạy về hướng nhà thờ là hành động xảy ra trước hành động ngã và vẫn còn đang xảy ra nên ta chia thì quá khứ tiếp diễn"
        },
        {
          "num": 33,
          "type": "choice",
          "text": "Within a week she knew the fearful mistake she _______________.",
          "options": {
            "A": "made",
            "B": "has made",
            "C": "had made",
            "D": "was making"
          },
          "answer": "C",
          "explanation": "Dịch: Trong vòng một tuần, cô ta đã biết lỗi lầm đáng sợ mà cô ta đã gây ra. => Hành động “gây ra lỗi lầm” xảy ra trước hành động “biết”. Mà hành động “biết” chia ở thì quá khứ đơn thì hành động “nhận ra lỗi lầm” phải chia ở thì quá khứ hoàn thành. =>C"
        },
        {
          "num": 34,
          "type": "choice",
          "text": "They _______________ table tennis when their father comes back home.",
          "options": {
            "A": "will play",
            "B": "will be playing",
            "C": "play",
            "D": "would play"
          },
          "answer": "B",
          "explanation": "Tạm dịch: Vào lúc bố họ trở về họ sẽ đang chơi bóng bàn. => Căn cứ vào mệnh đề trạng ngữ chỉ thời gian “when their father comes back home” có “comes” chia ở thì hiện tại nên hành động bố về chưa xảy ra. => Tính tới một thời điểm trong tương lai có một hành động sẽ đang diễn ra. => Chia thì tương lai tiếp diễn."
        },
        {
          "num": 35,
          "type": "choice",
          "text": "Before she went to bed, she ________________ her homework already.",
          "options": {
            "A": "finished",
            "B": "is finishing",
            "C": "had finished",
            "D": "was finishing"
          },
          "answer": "C",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: Before S + V (quá khứ đơn), S + V (quá khứ hoàn thành). – Dịch: Trước khi cô ấy đi ngủ, cô ấy đã hoàn thành bài tập về nhà rồi."
        },
        {
          "num": 36,
          "type": "choice",
          "text": "They are staying at the hotel in London. At this time tomorrow, they _____ in Vietnam.",
          "options": {
            "A": "will have travelled",
            "B": "will travel",
            "C": "will be travelling",
            "D": "will be travelled"
          },
          "answer": "C",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: At this time + thời gian trong tương lai => chia thì tương lai tiếp diễn. – Dịch: Họ đang ở khách sạn ở London. Vào thời điểm này ngày mai, họ sẽ đang ở Việt Nam."
        },
        {
          "num": 37,
          "type": "choice",
          "text": "There ____________ something vaguely familiar about her face but I couldn’t remember where I ___________ her before.",
          "options": {
            "A": "is/have met",
            "B": "was/had met",
            "C": "will see/meet",
            "D": "was/met"
          },
          "answer": "B",
          "explanation": "* Dịch nghĩa: Có một cái gì đó mơ hồ quen thuộc trên khuôn mặt của cô ấy nhưng tôi không thể nhớ tôi đã nhìn thấy cô ấy ở đâu trước đây. - “nhìn thấy cô ấy trước đây” xảy ra trước. => chia thì quá khứ hoàn thành. - “thấy quen thuộc về khuôn mặt của cô ấy” xảy ra sau. => chia thì quá khứ đơn."
        },
        {
          "num": 38,
          "type": "choice",
          "text": "Another million people ________________unemployed by the time next year.",
          "options": {
            "A": "will have become",
            "B": "will become",
            "C": "will be become",
            "D": "will be becoming"
          },
          "answer": "A",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: by the time+ trạng từ của tương lai => chia tương lai hoàn thành. – Dịch: Hàng triệu người khác sẽ thất nghiệp vào năm tới."
        },
        {
          "num": 39,
          "type": "choice",
          "text": "She told me that her family _________ long in that town.",
          "options": {
            "A": "has lived",
            "B": "had lived",
            "C": "lived",
            "D": "was living"
          },
          "answer": "B",
          "explanation": "Dịch nghĩa: Cô ấy đã kể với tôi rằng gia đình của cô ấy đã sống ở thị trấn này lâu rồi. - “việc gia đình sống lâu ở thị trấn này” diễn ra trước. => chia thì quá khứ hoàn thành."
        },
        {
          "num": 40,
          "type": "choice",
          "text": "By the time he _________________ out of jail, he will have forgotten how to function in the real world.",
          "options": {
            "A": "got",
            "B": "will get",
            "C": "gets",
            "D": "is getting"
          },
          "answer": "C",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: By the time S + V (hiện tại đơn), S + V (tương lai hoàn thành). – Dịch: Vào thời điểm anh ấy ra tù, anh sẽ quên làm sao sống ở thế giới thực."
        },
        {
          "num": 41,
          "type": "choice",
          "text": "I have been saving money because I _____ buy a computer",
          "options": {
            "A": "shall",
            "B": "will",
            "C": "am going to",
            "D": "would"
          },
          "answer": "C",
          "explanation": "Căn cứ vào cách dùng của thì tương lai gần: diễn tả một kế hoạch dự định (đã lên kế hoạch). - Kế hoạch từ trước: tiết kiệm tiền. – Dịch: Tôi đã tiết kiệm tiền bởi vì tôi sẽ mua máy tính."
        },
        {
          "num": 42,
          "type": "choice",
          "text": "By 8 o’clock yesterday, the spaceship ____ 20 hours around the earth",
          "options": {
            "A": "will travel",
            "B": "has been traveling",
            "C": "had been traveling",
            "D": "will have been traveling"
          },
          "answer": "C",
          "explanation": "Căn cứ vào “By + mốc thời gian quá khứ” => chia thì quá khứ hoàn thành. Trong câu này muốn nhấn mạnh tính liên tục của hành động – Dịch: Vào thời điểm 9 giờ ngày hôm qua, con tàu vũ trụ đã di chuyển 20 giờ vòng quanh trái đất."
        },
        {
          "num": 43,
          "type": "choice",
          "text": "Over 20 years ___ but I never forgot the time we first met each other.",
          "options": {
            "A": "went",
            "B": "have gone up",
            "C": "has gone by",
            "D": "has gone out"
          },
          "answer": "C",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại hoàn thành: Một hành động bắt đầu trong quá khứ và kéo dài đến hiện tại. Ta có: + go up: tăng lên + go by: trôi qua (thời gian), tuột mất + go out: mất điện/ra ngoài/đi chơi – Dịch: Hơn 20 năm đã trôi qua nhưng tôi chưa bao giờ quên lần đầu tiên chúng tôi gặp nhau."
        },
        {
          "num": 44,
          "type": "choice",
          "text": "The child kept the present that she _________________.",
          "options": {
            "A": "has been given",
            "B": "had been given",
            "C": "had given",
            "D": "has given"
          },
          "answer": "B",
          "explanation": "Căn cứ vào cách dùng của thì quá khứ hoàn thành: Khi hai hành động cùng xảy ra trong quá khứ, ta dùng thì quá khứ hoàn thành cho hành động xảy ra trước và quá khứ đơn cho hành động xảy ra sau. – Dịch: Con bé giữ món quà mà nó được tặng."
        },
        {
          "num": 45,
          "type": "choice",
          "text": "That pipe ___________ for ages. We must get it mended.",
          "options": {
            "A": "has been leaking",
            "B": "has been leaked",
            "C": "had been leaked",
            "D": "had been leaking"
          },
          "answer": "A",
          "explanation": "* Căn cứ: - “for ages” nhấn mạnh tính liên tục của việc “rò rỉ” xảy ra trong nhiều năm => Chia hiện tại hoàn thành tiếp diễn. - Dù dịch là “bị rò rỉ” nhưng chúng ta không chia thể bị động cho động từ “leak”. Vì hành động “leak” là do ống nước tự nó bị hỏng chứ không phải do cái gì tác động vào. * Dịch: Ống dẫn nước đã bị rò rỉ trong suốt nhiều năm; chúng tôi phải nhờ sửa nó."
        },
        {
          "num": 46,
          "type": "choice",
          "text": "I used my calculator; otherwise it ___________ longer.",
          "options": {
            "A": "will take",
            "B": "would take",
            "C": "took",
            "D": "would have taken"
          },
          "answer": "D",
          "explanation": "Ta có: S + V(quá khứ đơn) + otherwise + S + would/could + have + Vp2 Dịch: Tôi đã dùng máy tính còn không thì nó có thể đã phải mất thời gian lâu hơn."
        },
        {
          "num": 47,
          "type": "choice",
          "text": "How many musical notes of the 11,000 tones that the human ear can distinguish ____ in the musical scale?",
          "options": {
            "A": "is it",
            "B": "it is",
            "C": "are there",
            "D": "there are"
          },
          "answer": "C",
          "explanation": "Dịch: Có bao nhiêu nốt nhạc trong 11000 âm mà tai của con người có thể phân biệt được trong thang âm nhạc? Cấu trúc: How many + N(số nhiều) + are there + in + …..? (có bao nhiêu…?)"
        },
        {
          "num": 48,
          "type": "choice",
          "text": "You ____ to our conversation. It was private.",
          "options": {
            "A": "haven’t been listening",
            "B": "shouldn’t have been listening",
            "C": "couldn’t have been listening",
            "D": "hadn’t been listening"
          },
          "answer": "B",
          "explanation": "Ta có: Shouldn’t + have + Vp2: lẽ ra không nên làm nhưng đã làm rồi -> Vì là một “conversation” nên hành động “listen” cũng phải diễn ra liên tục trong một thời gian dài suốt cả cuộc trò chuyện đó. Để nhấn mạnh quá trình liên tục của hành động, ra dùng “shouldn’t have been Ving” – Dịch: Bạn lẽ ra không nên nghe cuộc trò chuyện của chúng tôi. Cuộc trò chuyện của chúng tôi riêng tư."
        },
        {
          "num": 49,
          "type": "choice",
          "text": "The President _______ a speech, but in the end he _______ his mind.",
          "options": {
            "A": "would deliver – had changed",
            "B": "was going to deliver – changed",
            "C": "delivered – had changed",
            "D": "was delivering – changed"
          },
          "answer": "B",
          "explanation": "Dịch nghĩa: Tổng thống định phát biểu một bài diễn văn, nhưng cuối cùng ông ấy đã thay đổi ý định. => Định phát biểu xong lại thôi => xảy ra nối tiếp nhau => chia quá khứ đơn => Loại A,C cũng loại vì chỉ dùng quá khứ tiếp diễn-quá khứ đơn cùng nhau khi diễn tả một hành động đang xảy ra thì có một hành động khác xen vào. Ở đây không thể là ông đang phát biểu thì ông lại thôi; hành động thay đổi là hành động quyết định tại thời điểm nói chứ không phải là hành động xen vào => Diễn tả một dự định ta dùng thì tương lai gần, tuy nhiên do động từ phía sau chia quá khứ đơn nên động từ phía trước phải lùi thì."
        },
        {
          "num": 50,
          "type": "choice",
          "text": "The Angkor complex _______________ the entire range of Khmer art from the 9th to the 14th century.",
          "options": {
            "A": "represented",
            "B": "represents",
            "C": "represent",
            "D": "was represented"
          },
          "answer": "B",
          "explanation": "Dịch nghĩa: Quần thể Angkor đại diện cho toàn bộ nghệ thuật của người Khơ-me từ thế kỉ thứ 9 đến thế kỉ 14. => Câu mang nghĩa chủ động nên ta loại D => Chủ ngữ “The Angkor complex” ở dạng số ít nên ta loại C => Trong câu có dấu hiệu trạng từ thời gian nhưng “từ thế kỉ thứ 9 đến thế kỉ 14” là bổ nghĩa cho \" nghệ thuật của người Khơ-me\". Từ đó ta loại A."
        }
      ]
    },
    {
      "name": "Exercise 3",
      "description": "Mark the letter A, B, C or D to indicate the underlined part that needs correction in each of the following questions.",
      "questions": [
        {
          "num": 1,
          "type": "choice",
          "text": "One of the sad moments of the cruise was saying goodbye to Mel, who had sailed with us since we had set sail but whose health problems forced him to leave us at Lagos.",
          "options": {
            "A": "was saying",
            "B": "had sailed",
            "C": "had set",
            "D": "to leave"
          },
          "answer": "C",
          "explanation": "Dịch: Một trong những khoảnh khắc buồn của hành trình là nói lời tạm biệt với Mel, người đã đi thuyền với chúng tôi kể từ khi chúng tôi ra khơi nhưng vấn đề sức khỏe buộc anh ấy phải rời bỏ chúng tôi tại Lagos. Giải thích: – Căn cứ vào cách dùng của “since”, ta có cấu trúc: S + V (hiện tại hoàn thành) + since S + V (quá khứ đơn) – Căn cứ vào động từ \"was\" và theo quy tắc về sự phối thì thì has sailed => had sailed. Tuy nhiên, động từ trong mệnh đề trạng ngữ chỉ thời gian không lùi thì. (had set => set)"
        },
        {
          "num": 2,
          "type": "choice",
          "text": "He was in a great hurry and had no time to think it over. Otherwise, he had found another way out.",
          "options": {
            "A": "in a great hurry",
            "B": "think it over",
            "C": "had found",
            "D": "another"
          },
          "answer": "C",
          "explanation": "Dịch: Anh ấy đã rất vội và không có thời gian để nghĩ về nó. Nếu không thì, anh đã tìm ra một lối thoát khác. Cấu trúc: - S + V (hiện tại đơn) + otherwise + S + would/could + V - S + V (quá khứ đơn) + otherwise + S + would/could + have + Vp2C (had found => could have found)"
        },
        {
          "num": 3,
          "type": "choice",
          "text": "Why didn’t you come to see us when we are having lunch?",
          "options": {
            "A": "didn’t",
            "B": "come",
            "C": "see",
            "D": "are having"
          },
          "answer": "A",
          "explanation": "Cấu trúc câu mời/đề nghị: why don’t you/we + V(bare) A (didn’t => don’t) – Dịch: Tại sao bạn không đến gặp chúng tôi khi chúng tôi đang ăn trưa?"
        },
        {
          "num": 4,
          "type": "choice",
          "text": "As soon as the next lesson has finished, we leave.",
          "options": {
            "A": "As",
            "B": "the",
            "C": "has finished",
            "D": "leave"
          },
          "answer": "D",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: As soon as + S + V (hiện tại đơn / hiện tại hoàn thành), S + V (tương lai đơn). => Sửa lỗi: leave => will leave – Dịch: Ngay sau khi tiết học tiếp theo kết thúc, chúng tôi sẽ rời đi."
        },
        {
          "num": 5,
          "type": "choice",
          "text": "At 8 o’clock this evening my friends and I will have watched a famous film at the cinema.",
          "options": {
            "A": "this",
            "B": "and",
            "C": "will have watched",
            "D": "the"
          },
          "answer": "C",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: At + giờ + thời gian tương lai => chia thì tương lai tiếp diễn. – Dịch: Vào lúc 8 giờ tối nay, chúng tôi sẽ đang xem một bộ phim nổi tiếng ở rạp chiếu phim. - Sửa lỗi: will have watched => will be watching"
        },
        {
          "num": 6,
          "type": "choice",
          "text": "John won’t be finishing the study by July because he has some health problems.",
          "options": {
            "A": "won’t be finishing",
            "B": "by",
            "C": "because",
            "D": "has"
          },
          "answer": "A",
          "explanation": "Căn cứ dấu hiệu nhận biết thì TLHT: By+ thời gian tương lai => chia tương lai hoàn thành. Sửa: won’t have finished Dịch: John sẽ không hoàn thành việc học tập tính đến tháng bảy bởi vì anh ấy có những vấn đề về sức khỏe."
        },
        {
          "num": 7,
          "type": "choice",
          "text": "The lung cancer mortality rate rose six-fold in males when mass media started covering the health risks of smoking.",
          "options": {
            "A": "mortality rate",
            "B": "rose",
            "C": "covering",
            "D": "health"
          },
          "answer": "B",
          "explanation": "(rose => had risen) – Dịch: Tỷ lệ tử vong do ung thư phổi đã tăng lên sáu lần ở nam giới thì các phương tiện truyền thông đại chúng mới bắt đầu báo cáo những mối nguy hại của việc hút thuốc lá."
        },
        {
          "num": 8,
          "type": "choice",
          "text": "Jane spent a lot of money yesterday. She had bought a dress which cost $100.",
          "options": {
            "A": "spent",
            "B": "yesterday",
            "C": "had bought",
            "D": "cost"
          },
          "answer": "C",
          "explanation": "Căn cứ vào cách dùng của thì quá khứ đơn: Diễn đạt các hành động xảy ra liên tiếp trong quá khứ. – Dịch: Hôm qua, Jane đã tiêu rất nhiều tiền. Cô ấy đã mua một chiếc váy giá 100 đôla. => Việc cô ấy mua váy xảy ra ngày hôm qua nên động từ “buy” chia ở thì quá khứ đơn (had bought => bought) *Note: cost-cost-cost (v): trị giá, có giá (bao nhiêu)"
        },
        {
          "num": 9,
          "type": "choice",
          "text": "No sooner did he return from a long journey than he was ordered to pack his bags.",
          "options": {
            "A": "did he return",
            "B": "long",
            "C": "than",
            "D": "was ordered"
          },
          "answer": "A",
          "explanation": "Căn cứ vào cấu trúc câu đảo ngữ: No sooner + had + S + V (quá khứ hoàn thành) + than + S + V (quá khứ đơn). – Dịch: Ngay khi anh ấy trở lại từ một chuyến đi dài thì anh ấy được yêu cầu đóng gói hành lí. (did he return => had he returned)"
        },
        {
          "num": 10,
          "type": "choice",
          "text": "The crime rate in this city has increased from ten per cent last year to thirty percent by the end of 2019 due to the influx of the gang element.",
          "options": {
            "A": "has increased",
            "B": "to",
            "C": "due to",
            "D": "influx"
          },
          "answer": "A",
          "explanation": "Dịch: Tỷ lệ tội phạm ở thành phố này sẽ tăng từ mười phần trăm vào năm ngoái tới ba mươi phần trăm vào cuối năm 2019 do sự gia tăng của các thành phần băng đảng. Căn cứ vào cụm “by the end of 2019” => chia thì tương lai hoàn thành (has increased => will have increased) Lưu ý: Các bạn sửa trong sách giúp Cô 2009 => 2019 nha)"
        },
        {
          "num": 11,
          "type": "choice",
          "text": "At this time last year, I am attending an English course in America.",
          "options": {
            "A": "At this time",
            "B": "am attending",
            "C": "an",
            "D": "in"
          },
          "answer": "B",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: At this time + thời gian trong quá khứ => chia thì quá khứ tiếp diễn. – Dịch: Vào thời điểm này năm ngoái, tôi đang tham gia khóa học tiếng anh ở Mỹ."
        },
        {
          "num": 12,
          "type": "choice",
          "text": "When we got home last night, we found that somebody broke into the flat.",
          "options": {
            "A": "got",
            "B": "found",
            "C": "somebody",
            "D": "broke"
          },
          "answer": "D",
          "explanation": "Dịch: Khi chúng tôi về nhà tối hôm qua, chúng tôi thấy rằng ai đó đã đột nhập vào căn hộ. => Hành động \"đột nhập vào căn hộ\" xảy ra trước hành động \"về nhà rồi thấy\" nên ta chia ở thì quá khứ hoàn thành. (broke => had broken)"
        },
        {
          "num": 13,
          "type": "choice",
          "text": "While the plumber was repairing the dishwasher, I had watched the smartphone.",
          "options": {
            "A": "plumber",
            "B": "was repairing",
            "C": "had watched",
            "D": "the"
          },
          "answer": "C",
          "explanation": "Dịch: Trong lúc thợ sửa ống nước đang sửa máy rửa bát thì tôi đang xem điện thoại. => Diễn tả hai hành động xảy ra song song đồng thời => chia thì quá khứ tiếp diễn => Sửa lỗi: had watched => was watching"
        },
        {
          "num": 14,
          "type": "choice",
          "text": "When their dad got home, the boys had been watching TV for three hours.",
          "options": {
            "A": "When",
            "B": "got",
            "C": "had been watching",
            "D": "for"
          },
          "answer": "C",
          "explanation": "Dịch: Khi bố của những cậu bé về nhà, chúng đã xem TV trong 3 giờ. Ta có: Hành động bố về chia ở thì quá khứ thì hành động xem ti vi xảy ra trước đó nên chia ở thì quá khứ hoàn thành tiếp diễn, vì nhấn mạnh quá trình của hành động “for three hours”"
        },
        {
          "num": 15,
          "type": "choice",
          "text": "If he continues drinking so fast, he would drink the whole bottle by midnight.",
          "options": {
            "A": "continues",
            "B": "fast",
            "C": "would",
            "D": "by"
          },
          "answer": "C",
          "explanation": "Căn cứ vào đây là câu điều kiện loại 1: If + S + V (hiện tại đơn), S + will + V (nguyên dạng)C (would => will) Dịch: Nếu anh ta tiếp tục uống quá nhanh, anh ta sẽ uống hết cả chai vào lúc nửa đêm."
        },
        {
          "num": 16,
          "type": "choice",
          "text": "On the way to Oxford I stopped to have a cup of coffee at a roadside restaurant and when I came out of the restaurant it stopped raining.",
          "options": {
            "A": "On the way",
            "B": "stopped",
            "C": "came out",
            "D": "stopped"
          },
          "answer": "D",
          "explanation": "Lưu ý tuy câu B giống câu D nhưng 2 từ stopped này hoàn toàn ở vị trị khác nhau. – Căn cứ vào cách dùng của thì quá khứ hoàn thành: Thì quá khứ hoàn thành diễn tả hành động đã xảy ra và đã hoàn tất trước một thời điểm trong quá khứ, hoặc trước một hành động khác cũng đã kết thúc trong quá khứ. – Dịch: Trên đường đến Oxford, tôi đã dừng lại để uống cà phê ở một nhà hàng bên đường và khi tôi ra khỏi nhà hàng trời đã dừng mưa. (stopped => had stopped)"
        },
        {
          "num": 17,
          "type": "choice",
          "text": "She washed the dishes when her parents came back home.",
          "options": {
            "A": "washed",
            "B": "dishes",
            "C": "when",
            "D": "came"
          },
          "answer": "A",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: When S + V (quá khứ đơn), S + V (quá khứ tiếp diễn). => Diễn tả một hành động đang diễn ra thì có hành động khác xen vào. – Sửa lỗi: washed => was washing – Dịch: Cô ấy đang rửa bát thì bố mẹ của cô ấy về nhà."
        },
        {
          "num": 18,
          "type": "choice",
          "text": "That evening we had stayed up to talk about the town, where he had lived for some years.",
          "options": {
            "A": "That",
            "B": "had stayed",
            "C": "where",
            "D": "had lived"
          },
          "answer": "B",
          "explanation": "Dịch nghĩa: Tối đó chúng tôi đã thức để nói về thị trấn nơi mà chúng tôi đã sống trong nhiều năm. + “việc sống ở thị trấn trong nhiều năm” xảy ra trước => chia thì quá khứ hoàn thành. + “việc thức” xảy ra sau. => chia thì quá khứ đơn. (had stayed => stayed)"
        },
        {
          "num": 19,
          "type": "choice",
          "text": "It is the worst dish that I ever tried in my life.",
          "options": {
            "A": "is",
            "B": "worst",
            "C": "that",
            "D": "tried"
          },
          "answer": "D",
          "explanation": "Dịch: Đó là món ăn tồi tệ nhất mà tôi từng thử trong đời. => Diễn tả trải nghiệm => chia thì hiện tại hoàn thành (tried => have ever tried)"
        },
        {
          "num": 20,
          "type": "choice",
          "text": "At first I thought I did the right thing, but soon I realized that I’d made a serious mistake.",
          "options": {
            "A": "At first",
            "B": "did",
            "C": "realized",
            "D": "serious"
          },
          "answer": "B",
          "explanation": "(did => had done) – Dịch: Đầu tiên tôi nghĩ tôi đã làm đúng, nhưng tôi sớm nhận ra rằng tôi đã mắc một lỗi nghiêm trọng."
        },
        {
          "num": 21,
          "type": "choice",
          "text": "I was not able to join them in the bicycle ride into the country. I lent John my bike the day before.",
          "options": {
            "A": "was",
            "B": "to join",
            "C": "ride into",
            "D": "lent"
          },
          "answer": "D",
          "explanation": "Dịch: Tôi không thể tham gia với họ trong chuyến đạp xe vòng quanh đất nước. Tôi đã cho John mượn xe đạp của của mình ngày hôm trước. Giải thích: Vì cho John mượn xe đạp nên không thể tham gia đạp xe => hành động không thể tham gia đạp xe chia quá khứ đơn thì hành động cho mượn xe đạp xảy ra trước phải chia thì quá khứ hoàn thành. (lent => had lent)"
        },
        {
          "num": 22,
          "type": "choice",
          "text": "The man who answered the phone said he has read all about the scandal in the newspapers a year or two before.",
          "options": {
            "A": "The",
            "B": "answered",
            "C": "has read",
            "D": "in the newspapers"
          },
          "answer": "C",
          "explanation": "Dịch: Người đàn ông đã nghe điện thoại nói rằng anh ấy đã đọc được tất cả vụ tai tiếng trên báo một hoặc hai năm trước. + “đọc được vụ tai tiếng” xảy ra vào khoảng thời gian “một hoặc hai năm trước”. + xảy ra trước “nói chuyện điện thoại”. (has read => had read)"
        },
        {
          "num": 23,
          "type": "choice",
          "text": "Michael, the student who makes a speech right now, is majoring in drama and hopes someday to become a great actress.",
          "options": {
            "A": "makes",
            "B": "is",
            "C": "hopes",
            "D": "someday"
          },
          "answer": "A",
          "explanation": "(is making) – Dịch: Michael, người đang phát biểu, đang đóng vai chính trong vở kịch và hi vọng một ngày nào đó trở thành một nữ diễn viên xuất sắc."
        },
        {
          "num": 24,
          "type": "choice",
          "text": "This was the talking between brothers who have just met up with each other.",
          "options": {
            "A": "was",
            "B": "between",
            "C": "have just met",
            "D": "with"
          },
          "answer": "C",
          "explanation": "> Dịch: Đây là cuộc nói chuyện giữa hai người anh trai vừa mới gặp lại nhau. Căn cứ vào “was” thì động từ “have just met” phải lùi thì (have just met => had just met)"
        },
        {
          "num": 25,
          "type": "choice",
          "text": "He refuses to admit that he had made some corrections in the document.",
          "options": {
            "A": "refuses",
            "B": "to admit",
            "C": "had made",
            "D": "corrections"
          },
          "answer": "A",
          "explanation": "Dịch nghĩa: Anh ấy đã không thừa nhận rằng anh ấy đã làm một số hiệu chỉnh ở trong tài liệu. + hành động \" từ chối thừa nhận\" xảy ra sau việc “làm 1 số hiệu chỉnh”. => chia thì quá khứ đơn. : (refuses => refused)"
        },
        {
          "num": 26,
          "type": "choice",
          "text": "He waited until the guest left the room and then sat down at the desk.",
          "options": {
            "A": "waited",
            "B": "left",
            "C": "and",
            "D": "sat down"
          },
          "answer": "A",
          "explanation": "Dịch nghĩa: Anh ấy chờ cho đến khi khách rời khỏi phòng và sau đó ngồi xuống bàn. - Ta có hành động “chờ” xảy ra xong trước hai hành động còn lại nên phải chia ở thì quá khứ hoàn thành (waited => had waited)"
        },
        {
          "num": 27,
          "type": "choice",
          "text": "You can trust me. I remember sending the documents right after you sign it.",
          "options": {
            "A": "can trust",
            "B": "sending",
            "C": "right after",
            "D": "sign"
          },
          "answer": "D",
          "explanation": "Dịch nghĩa: Anh có thể tin tưởng tôi. Tôi nhớ đã gửi nó ngay sau khi anh kí nó. (sign => had signed) Giải thích: Cấu trúc: remember to do st: nhớ phải làm gì (chưa làm) remember doing st: nhớ đã làm gì (đã làm) => Hành động “kí” xảy ra trước hành động “gửi” => trước của quá khứ là quá khứ hoàn thành."
        },
        {
          "num": 28,
          "type": "choice",
          "text": "When the candidate will speak at the public meeting tonight, his campaign manager will arrange the location for his next appearance.",
          "options": {
            "A": "will speak",
            "B": "at",
            "C": "his campaign manager",
            "D": "will arrange"
          },
          "answer": "A",
          "explanation": "Căn cứ vào đây là mệnh đề trạng ngữ chỉ thời gian: When + S + V (hiện tại đơn), S + V (tương lai đơn) (diễn tả hành động xảy ra nối tiếp nhau trong tương lai, khi dùng với trạng từ chỉ thời gian “when/since/…” thì tương lai đơn sẽ đưa về dạng hiện tại đơn) – Dịch: Khi ứng cử viên phát biểu trước cuộc họp công khai tối nay, người quản lí chiến dịch của anh ấy sẽ sắp xếp vị trí xuất hiện tiếp theo của anh ấy. (will speak => speaks)"
        },
        {
          "num": 29,
          "type": "choice",
          "text": "I’m going out for a walk. I had been reading too long, in fact since early morning.",
          "options": {
            "A": "I’m going",
            "B": "had been reading",
            "C": "in fact",
            "D": "early morning"
          },
          "answer": "B",
          "explanation": "Căn cứ vào cách dùng của thì hiện tại hoàn thành tiếp diễn: diễn tả hành động xảy ra trong quá khứ và kéo dài tới hiện tại (nhấn mạnh tính liên tục của hành động). – Dịch: Tôi sẽ ra ngoài đi dạo. Tôi đã đọc sách trong một thời gian dài, thực tế là từ sáng sớm tới giờ rồi. (had been reading => have been reading)"
        },
        {
          "num": 30,
          "type": "choice",
          "text": "Stay in the house and wait till you get a phone call from him. He has told you where to look for her.",
          "options": {
            "A": "Stay in",
            "B": "till you get",
            "C": "has told",
            "D": "Where"
          },
          "answer": "C",
          "explanation": "Dịch: Hãy ở nhà cho đến khi bạn nhận được điện thoại của anh ấy. Anh ấy sẽ nói với bạn cô ấy ở đâu để tìm. Ta có: S + V(tương lai đơn) + till/until + S + V(hiện tại đơn/hiện tại hoàn thành) Hoặc: V(bare)/Don’t V(bare) + till/until + S +V(hiện tại đơn/hiện tại hoàn thành) => A,B không sai - Cấu trúc: WH_ + to V nên D không sai Căn cứ theo nghĩa của câu 2 thìC (has told => will tell)"
        }
      ]
    }
  ]
};
