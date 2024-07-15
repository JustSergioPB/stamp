import { ValidityZod } from "@features/credentials/template/models";

export class ValidityUtils {
  static getRange(validity: ValidityZod): {
    validFrom: Date;
    validUntil: Date;
  } {
    const validFrom = new Date();
    let validUntil = validFrom;
    if (validity.years) {
      validUntil.setFullYear(validFrom.getFullYear() + validity.years);
    }
    if (validity.months) {
      validUntil.setMonth(validFrom.getMonth() + validity.months);
    }
    if (validity.days) {
      validUntil.setDate(validFrom.getDate() + validity.days);
    }
    if (validity.hours) {
      validUntil.setHours(validFrom.getHours() + validity.hours);
    }
    if (validity.mins) {
      validUntil.setMinutes(validFrom.getMinutes() + validity.mins);
    }
    if (validity.secs) {
      validUntil.setSeconds(validFrom.getSeconds() + validity.secs);
    }
    return { validFrom, validUntil };
  }
}
