!function(e, a) {
    "object"==typeof exports&&"undefined"!=typeof module?module.exports=a():"function"==typeof define&&define.amd?define(a):(e.ReactIntlLocaleData=e.ReactIntlLocaleData|| {}
    , e.ReactIntlLocaleData.en=a())
}

(this, function() {
    "use strict";
    var e=[ {
        locale:"vn", pluralRuleFunction:function(e, a) {
            var n=String(e).split("."), l=!n[1], o=Number(n[0])==e, t=o&&n[0].slice(-1), r=o&&n[0].slice(-2);
            return a?1==t&&11!=r?"one": 2==t&&12!=r?"two": 3==t&&13!=r?"few": "other": 1==e&&l?"one": "other"
        }
        , fields: {
            year: {
                displayName:"năm", relative: {
                    0: "năm nay", 1: "năm sau", "-1": "năm trước"
                }
                , relativeTime: {
                    future: {
                        one:"trong vòng {0} năm", other:"trong {0} năm"
                    }
                    , past: {
                        one:"{0} năm trước", other:"{0} năm trước"
                    }
                }
            }
            , month: {
                displayName:"tháng", relative: {
                    0: "tháng này", 1: "tháng sau", "-1": "tháng trước"
                }
                , relativeTime: {
                    future: {
                        one:"trong vòng {0} tháng", other:"trong {0} tháng"
                    }
                    , past: {
                        one:"{0} tháng trước", other:"{0} tháng trước"
                    }
                }
            }
            , day: {
                displayName:"ngày", relative: {
                    0: "hôm nay", 1: "ngày mai", "-1": "ngày hôm qua"
                }
                , relativeTime: {
                    future: {
                        one:"trong vòng {0} ngày", other:"trong {0} ngày"
                    }
                    , past: {
                        one:"{0} ngày trước", other:"{0} gày trước"
                    }
                }
            }
            , hour: {
                displayName:"giờ", relativeTime: {
                    future: {
                        one:"trong vòng {0} giờ", other:"trong {0} giờ"
                    }
                    , past: {
                        one:"{0} giờ trước", other:"{0} giờ trước"
                    }
                }
            }
            , minute: {
                displayName:"phút", relativeTime: {
                    future: {
                        one:"trong vòng {0} phút", other:"trong {0} phút"
                    }
                    , past: {
                        one:"{0} phút trước", other:"{0} phút trước"
                    }
                }
            }
            , second: {
                displayName:"giây", relative: {
                    0: "ngay bây giờ"
                }
                , relativeTime: {
                    future: {
                        one:"trong vòng {0} giây", other:"trong {0} giây"
                    }
                    , past: {
                        one:"{0} giây trước", other:"{0} giây trước"
                    }
                }
            }
        }
    }
    , {
        locale:"en-Dsrt", pluralRuleFunction:function(e, a) {
            return"other"
        }
        , fields: {
            year: {
                displayName:"Year", relative: {
                    0: "this year", 1: "next year", "-1": "last year"
                }
                , relativeTime: {
                    future: {
                        other:"+{0} y"
                    }
                    , past: {
                        other:"-{0} y"
                    }
                }
            }
            , month: {
                displayName:"Month", relative: {
                    0: "this month", 1: "next month", "-1": "last month"
                }
                , relativeTime: {
                    future: {
                        other:"+{0} m"
                    }
                    , past: {
                        other:"-{0} m"
                    }
                }
            }
            , day: {
                displayName:"Day", relative: {
                    0: "today", 1: "tomorrow", "-1": "yesterday"
                }
                , relativeTime: {
                    future: {
                        other:"+{0} d"
                    }
                    , past: {
                        other:"-{0} d"
                    }
                }
            }
            , hour: {
                displayName:"Hour", relativeTime: {
                    future: {
                        other:"+{0} h"
                    }
                    , past: {
                        other:"-{0} h"
                    }
                }
            }
            , minute: {
                displayName:"Minute", relativeTime: {
                    future: {
                        other:"+{0} min"
                    }
                    , past: {
                        other:"-{0} min"
                    }
                }
            }
            , second: {
                displayName:"Second", relative: {
                    0: "now"
                }
                , relativeTime: {
                    future: {
                        other:"+{0} s"
                    }
                    , past: {
                        other:"-{0} s"
                    }
                }
            }
        }
    }
    ];
    return e
}

);