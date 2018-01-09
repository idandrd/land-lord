const landLord = {
  case1: {
    metadata: {},
    assets: [
      {
        identifier: 12334,
        name: "the penthouse",
        address: "sokolov 50, Netanya",
        comments: "best asset everr!1",
        units: [
          {
            unit_number: 5,
            storey: 2,
            size: 70,
            owner: "Amir",
            comments: "broken floor",
          }
        ],
      },
    ],
    parties: [
      {
        identifier: 123456,
        name: "kastro",
        isBusiness: true,
        comments: "very good",
        contacts: [
          {
            identifier: 12345,
            name: "yonatan",
            role: "CEO",
            phone: "054-9734567",
            email: "hello@world.com",
            comments: "asshole",
          },
        ],
      },
    ],
    contracts: [
      {
        unit_id: 1234,
        renter_id: 1234,
        rent_start_date: "8/1/17",
        rent_end_date: "8/1/19",
        checks_left: 12,
        checks_payday: 3,
        extensions: [
          {
            order: 1,
            months: 12,
            notice: 90,
          },
          {
            order: 2,
            months: 12,
            notice: 90,
          }
        ],
        personal_guarantees: ["contact_id1", "contact_id2"],
        bank_guarantee_expiration_date: "8/1/19",
        bank_guarantee_sum: 100000,
      },
    ],
    tasks: [],
  },
  case2: {},
  case3: {},
};