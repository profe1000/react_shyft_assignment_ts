const data = {
  data: {
    id: "demo",
    type: "households",
    attributes: {
      address_1: "123 Demonstration Boulevard",
      address_2: "Apartment #3",
      city: null,
      state: "AA",
      postal_code: "00000",
      country: "Canada",
      number_of_residents: null,
      has_24_hr_power: false,
      monthly_budget: 100000.0,
      monthly_grid_budget: null,
      monthly_gen_budget: null,
      usage_data: {
        gen_cost_today: 1719.0304081444235,
        grid_cost_today: 540.8865716000943,
        gen_usage_today: 5.933840949738929,
        grid_usage_today: 22.53694048333726,
        gen_cost_this_month: 93848.26616055459,
        grid_cost_this_month: 7281.495502534347,
        gen_hours_today: 5.0,
        grid_hours_today: 8.0,
      },
      household_type: null,
      tenant_type: null,
      automated_switching: false,
      nickname: "Demonstration",
      user_is_admin: false,
      user_is_writer: false,
      monthly_grid_expense: null,
      monthly_gen_expense: null,
      address: {
        id: 21,
        street_number: "7A",
        route: "Milverton Road",
        locality: null,
        administrative_area_level_2: "Ikoyi",
        administrative_area_level_1: null,
        administrative_area_level_1_code: "Lagos",
        country: "Nigeria",
        country_code: "NG",
        postal_code: null,
        latitude: 6.450175,
        longitude: 3.444995,
        formatted_address: null,
        found_via: "manual_input",
        created_at: "2020-05-13T04:24:08.122Z",
        updated_at: "2020-05-13T04:24:08.182Z",
      },
      has_gen: null,
      automatic_mode_available: false,
      automatic_mode: false,
      energy_system_id: "dda649e6-4f2d-492a-8210-929079ffc03b",
      active_features: [],
      user_nickname: "Demonstration",
      has_power_switching_schedule: null,
    },
    relationships: {
      devices: {
        data: [
          {
            id: "solstice-demo",
            type: "devices",
          },
          {
            id: "solstice-demo-studer",
            type: "devices",
          },
          {
            id: "solstice-demo-netbiter",
            type: "devices",
          },
        ],
      },
      users: {
        data: [
          {
            id: "100",
            type: "users",
          },
        ],
      },
      generator: {
        data: null,
      },
      grid_connection: {
        data: null,
      },
      inverter: {
        data: null,
      },
      solar_system: {
        data: null,
      },
    },
  },
  included: [
    {
      id: "solstice-demo",
      type: "devices",
      attributes: {
        admin_pin: null,
        user_is_admin: false,
        online: true,
        device_type: "shyft",
      },
      relationships: {
        household: {
          data: {
            id: "demo",
            type: "households",
          },
        },
      },
    },
    {
      id: "solstice-demo-studer",
      type: "devices",
      attributes: {
        admin_pin: null,
        user_is_admin: false,
        online: true,
        device_type: "studer_xcom",
      },
      relationships: {
        household: {
          data: {
            id: "demo",
            type: "households",
          },
        },
      },
    },
    {
      id: "solstice-demo-netbiter",
      type: "devices",
      attributes: {
        admin_pin: null,
        user_is_admin: false,
        online: true,
        device_type: "netbiter",
      },
      relationships: {
        household: {
          data: {
            id: "demo",
            type: "households",
          },
        },
      },
    },
  ],
};

export default function getmockresult(index) {
  if (index === 200) {
    return data;
  }

  return null;
}
