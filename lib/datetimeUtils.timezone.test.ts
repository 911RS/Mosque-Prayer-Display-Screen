process.env.TZ = "UTC"
process.env.LOCALE = "en"
process.env.TIMEZONE = "Pacific/Auckland"

import { dtHijriNow, dtNowFormatFull, dtNowLocale } from "./datetimeUtils"

describe("TIMEZONE", () => {
  beforeEach(() => {
    jest.useFakeTimers()
    // 22:00 UTC on 3 October is 11:00 on 4 October in Auckland
    jest.setSystemTime(new Date("2026-10-03T22:00:00Z"))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("uses the mosque's date, not the server's", () => {
    expect(dtNowLocale().format("YYYY-MM-DD HH:mm")).toBe("2026-10-04 11:00")
    expect(dtNowFormatFull()).toBe("4 October 2026")
  })

  it("uses the mosque's date for the hijri calendar", () => {
    expect(dtHijriNow().format("YYYY-MM-DD")).toBe("2026-10-04")
  })
})
