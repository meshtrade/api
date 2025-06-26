import { MetaData } from "./fundingOrderMetadata_pb";
import { Fee } from "./fee_pb";
import { PaymentType } from "./paymentType_pb";

// jbjb
export function fundingMetaData(fundingMetaData: MetaData): FundingMetaData {
  if (fundingMetaData.getDirecteftmetadata()) {
    return new FundingMetaData({
      checkoutId: "",
      externalReference:
        fundingMetaData.getDirecteftmetadata()?.getExternalreference() ?? "",
      fee: fundingMetaData.getDirecteftmetadata()?.getFee() ?? new Fee(),
      paymentType: PaymentType.UNDEFINED_PAYMENT_TYPE,
    });
  } else if (fundingMetaData.getInvestecdirecteftmetadata()) {
    return new FundingMetaData({
      checkoutId: "",
      externalReference:
        fundingMetaData
          .getInvestecdirecteftmetadata()
          ?.getExternalreference() ?? "",
      fee:
        fundingMetaData.getInvestecdirecteftmetadata()?.getFee() ?? new Fee(),
      paymentType: PaymentType.UNDEFINED_PAYMENT_TYPE,
    });
  } else if (fundingMetaData.getPeachsettlementmetadata()) {
    return new FundingMetaData({
      checkoutId: "",
      externalReference:
        fundingMetaData
          .getPeachsettlementmetadata()
          ?.getExternaltransactionid() ?? "",
      fee: fundingMetaData.getPeachsettlementmetadata()?.getFee() ?? new Fee(),
      paymentType: PaymentType.UNDEFINED_PAYMENT_TYPE,
    });
  } else {
    return new FundingMetaData({
      checkoutId:
        fundingMetaData.getPeachpaymentmetadata()?.getCheckoutid() ?? "",
      externalReference:
        fundingMetaData.getPeachpaymentmetadata()?.getExternaltransactionid() ??
        "",
      fee: fundingMetaData.getPeachpaymentmetadata()?.getFee() ?? new Fee(),
      paymentType:
        fundingMetaData.getPeachpaymentmetadata()?.getPaymenttype() ??
        PaymentType.UNDEFINED_PAYMENT_TYPE,
    });
  }
}

class FundingMetaData {
  checkoutId: string;
  externalReference: string;
  fee: Fee;
  paymentType: PaymentType;

  constructor(data: FundingMetaData) {
    this.checkoutId = data.checkoutId;
    this.externalReference = data.externalReference;
    this.fee = data.fee;
    this.paymentType = data.paymentType;
  }
}
