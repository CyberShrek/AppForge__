const configOptions: [label: string, config: AppConfig][] =[
    ["Только заголовок", {
        code: "DEMO",
    }],
    ["Простая форма", {
        code: "DEMO",
        form: {
            sections:{
                section: {
                    fields: {
                        checkboxDemo: {
                            type: "checkbox",
                            label: "Чекбокс"
                        },
                        switchDemo: {
                            type: "switch",
                            label: "Переключатель"
                        },
                        datepickerDemo: {
                            type: "datepicker",
                            label: "Выбор дат"
                        },
                        selectDemo: {
                            type: "select",
                            label: "Выбор опций",
                            optionsSources:{
                                endpoint: {
                                    path: "/appforge/demo/options"
                                }
                            }
                        }
                    }
                }
            },
            submitText: "{Ничего не произойдёт}"
        }
    }],
    ["Форма с несколькими секциями", {
        code: "DEMO",
        form: {
            sections:{
                section1: {
                    title: "Чекбоксы",
                    fields: {
                        checkbox1: {
                            type: "checkbox",
                            label: "Чекбокс 1"
                        },
                        checkbox2: {
                            type: "checkbox",
                            label: "Чекбокс 2"
                        },
                        checkbox3: {
                            type: "checkbox",
                            label: "Чекбокс 3"
                        },
                        checkbox4: {
                            type: "checkbox",
                            label: "Чекбокс 4"
                        },
                        checkbox5: {
                            type: "checkbox",
                            label: "Чекбокс 5"
                        }
                    }
                },
                section2: {
                    title: "Переключатели",
                    fields: {
                        switch1: {
                            type: "switch",
                            label: "Переключатель 1"
                        },
                        switch2: {
                            type: "switch",
                            label: "Переключатель 2"
                        },
                        switch3: {
                            type: "switch",
                            label: "Переключатель 3"
                        },
                        switch4: {
                            type: "switch",
                            label: "Переключатель 4"
                        },
                        switch5: {
                            type: "switch",
                            label: "Переключатель 5"
                        }
                    }
                },
                section3: {
                    title: "Даты",
                    fields: {
                        datepicker1: {
                            type: "datepicker",
                            label: "Выбор даты"
                        },
                        datepicker2: {
                            type: "datepicker",
                            range: true,
                            label: "Выбор периода дат"
                        },
                        datepicker3: {
                            type: "datepicker",
                            maxDays: 5,
                            range: true,
                            label: "Выбор периода с ограничением 5 дней"
                        }
                    }
                },
                section4: {
                    title: "Селекты",
                    fields:{
                        select1: {
                            type: "select",
                            label: "Выбор опций",
                            optionsSources:{
                                endpoint: {
                                    path: "/appforge/demo/options"
                                }
                            }
                        },
                        select2: {
                            type: "select",
                            label: "Опции с кодами",
                            showCodes: true,
                            optionsSources:{
                                endpoint: {
                                    path: "/appforge/demo/options"
                                }
                            }
                        },
                        select3: {
                            type: "select",
                            label: "Множественный выбор",
                            multiple: true,
                            search: true,
                            optionsSources:{
                                endpoint: {
                                    path: "/appforge/demo/options"
                                }
                            }
                        }
                    }
                }
            },
            submitText: "{Ничего не произойдёт}"
        }
    }],
    ["Динамическое состояние формы и реактивные поля", {
        code: "DEMO",
        form: {
            sections: {
                switches: {
                    title: "Варианты секций",
                    fields: {
                        checkboxes: {
                            type: "switch",
                            label: "Цепь чекбоксов"
                        },
                        endpointOptions: {
                            type: "switch",
                            label: "Опции из эндпоинтов"
                        },
                        serviceBank: {
                            type: "switch",
                            label: "Опции из банка микросервисов"
                        }
                    }
                },
                checkboxes: {
                    title: "Чекбоксы",
                    fields: {
                        checkbox1: {
                            type: "checkbox",
                            label: "Показать второй чекбокс"
                        },
                        checkbox2: {
                            type: "checkbox",
                            label: "Показать третий чекбокс"
                        },
                        checkbox3: {
                            type: "checkbox",
                            label: "Показать четвёртый чекбокс"
                        },
                        checkbox4: {
                            type: "checkbox",
                            label: "Показать пятый чекбокс"
                        },
                        checkbox5: {
                            type: "checkbox",
                            label: "Показать пустую секцию"
                        }
                    }
                },
                empty: {
                    title: "Пустая секция"
                },
                endpointOptions: {
                    title: "Эндпоинты",
                    fields: {
                        options1: {
                            type: "select",
                            multiple: true,
                            label: "Просто опции",
                            optionsSources: {
                                endpoint: {
                                    path: "/appforge/demo/options"
                                }
                            }
                        },
                        options2: {
                            type: "select",
                            multiple: true,
                            label: "Выбранные в первом поле чётные опции",
                            optionsSources: {
                                endpoint: {
                                    path: "/appforge/demo/options",
                                    propertiesSources: ["endpointOptions.options1"]
                                }
                            }
                        },
                        options3: {
                            type: "select",
                            multiple: true,
                            label: "Выбранные во втором поле и отсортированные в обратном порядке опции",
                            optionsSources: {
                                endpoint: {
                                    path: "/appforge/demo/options",
                                    propertiesSources: ["endpointOptions.options2"]
                                }
                            }
                        }
                    }
                },
                serviceBankOptions: {
                    title: "Банк микросервисов",
                    fields: {
                        date: {
                            type: "datepicker",
                            label: "Дата действия"
                        },
                        countries: {
                            type: "select",
                            search: true,
                            optionsSources: {
                                serviceBank: {
                                    type: "countries",
                                    propertiesSources: {
                                        date: "serviceBankOptions.date"
                                    }
                                }
                            }
                        },
                        roads: {
                            type: "select",
                            search: true,
                            optionsSources: {
                                serviceBank: {
                                    type: "roads",
                                    propertiesSources: {
                                        date: "serviceBankOptions.date",
                                        countries: "serviceBankOptions.countries"
                                    }
                                }
                            }
                        },
                        stations: {
                            type: "select",
                            search: true,
                            optionsSources: {
                                serviceBank: {
                                    type: "stations",
                                    propertiesSources: {
                                        date: "serviceBankOptions.date",
                                        roads: "serviceBankOptions.roads"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            statementControl:{
                initPath: "/appforge/demo/statement/init",
                path: "/appforge/demo/statement"
            },
            submitText: "{Ничего не произойдёт}"
        }
    }],
    ["Комплексная форма", {
        code: "DEMO",
        forms: {
            form1: {
                title: "Первая форма",
                sections: {
                    section: {
                        title: "Переключатели",
                        fields: {
                            switch1: {
                                type: "switch",
                                label: "Переключатель 1"
                            },
                            switch2: {
                                type: "switch",
                                label: "Переключатель 2"
                            },
                            switch3: {
                                type: "switch",
                                label: "Переключатель 3"
                            },
                            switch4: {
                                type: "switch",
                                label: "Переключатель 4"
                            },
                            switch5: {
                                type: "switch",
                                label: "Переключатель 5"
                            }
                        }
                    }
                },
                confirmText: "Кнопка подтверждения первой формы"
            },
            form2: {
                title: "Вторая форма",
                sections: {
                    serviceBankOptions: {
                        title: "Банк микросервисов",
                        fields: {
                            date: {
                                type: "datepicker",
                                label: "Дата действия"
                            },
                            countries: {
                                type: "select",
                                search: true,
                                optionsSources: {
                                    serviceBank: {
                                        type: "countries",
                                        propertiesSources: {
                                            date: "serviceBankOptions.date"
                                        }
                                    }
                                }
                            },
                            roads: {
                                type: "select",
                                search: true,
                                optionsSources: {
                                    serviceBank: {
                                        type: "roads",
                                        propertiesSources: {
                                            date: "serviceBankOptions.date",
                                            countries: "serviceBankOptions.countries"
                                        }
                                    }
                                }
                            },
                            stations: {
                                type: "select",
                                search: true,
                                optionsSources: {
                                    serviceBank: {
                                        type: "stations",
                                        propertiesSources: {
                                            date: "serviceBankOptions.date",
                                            roads: "serviceBankOptions.roads"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                confirmText: "Кнопка подтверждения второй формы"
            },
            form3: {
                title: "Третья форма",
                sections: {
                    empty1: {
                        title: "Пустая секция 1"
                    },
                    empty2: {
                        title: "Пустая секция 2"
                    },
                    empty3: {
                        title: "Пустая секция 3"
                    }
                },
                confirmText: "Кнопка подтверждения третьей формы"
            }
        }
    }],
    ["Отчёты", {
        code: "DEMO",
        form: {
            sections: {
                masterConfig: {
                    title: "Глобальная конфигурация"
                },
                tableConfig: {
                    title: "Конфигурация таблицы",
                    fields: {
                        complexHead: {
                            type: "switch",
                            label: "Многослойный заголовок"
                        },
                        groupColumn: {
                            type: "switch",
                            label: "Группировка первичного столбца"
                        }
                    }
                },
                diagramsConfig: {
                    title: "Конфигурация диаграмм"
                }
            },
            submitText: "Подтвердить",
            submitPath: "/appforge/demo/report"
        }
    }]
]

export const demoOptions = new Map(configOptions
    .map(([label, config]) =>
        [JSON.stringify(config, null, 4), label])
)