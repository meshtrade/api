import { MetaData } from "./fundingOrderMetadata_pb";
import { Fee } from "./fee_pb";
import { PaymentType } from "./paymentType_pb";

export function fundingMetaData(fundingMetaData?: MetaData): FundingMetaData {
  switch (fundingMetaData?.getMetadataCase()) {
    case MetaData.MetadataCase.PEACHPAYMENTMETADATA:
      return new FundingMetaData({
        checkoutId:
          fundingMetaData.getPeachpaymentmetadata()?.getCheckoutid() ?? "",
        externalReference:
          fundingMetaData
            .getPeachpaymentmetadata()
            ?.getExternaltransactionid() ?? "",
        fee: fundingMetaData.getPeachpaymentmetadata()?.getFee() ?? new Fee(),
        paymentType:
          fundingMetaData.getPeachpaymentmetadata()?.getPaymenttype() ??
          PaymentType.UNDEFINED_PAYMENT_TYPE,
      });
    case MetaData.MetadataCase.PEACHSETTLEMENTMETADATA:
      return new FundingMetaData({
        checkoutId: "",
        externalReference:
          fundingMetaData
            .getPeachsettlementmetadata()
            ?.getExternaltransactionid() ?? "",
        fee:
          fundingMetaData.getPeachsettlementmetadata()?.getFee() ?? new Fee(),
        paymentType: PaymentType.UNDEFINED_PAYMENT_TYPE,
      });
    case MetaData.MetadataCase.INVESTECDIRECTEFTMETADATA:
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
    case MetaData.MetadataCase.DIRECTEFTMETADATA:
      return new FundingMetaData({
        checkoutId: "",
        externalReference:
          fundingMetaData.getDirecteftmetadata()?.getExternalreference() ?? "",
        fee: fundingMetaData.getDirecteftmetadata()?.getFee() ?? new Fee(),
        paymentType: PaymentType.UNDEFINED_PAYMENT_TYPE,
      });
    case MetaData.MetadataCase.METADATA_NOT_SET:
    default:
      return new FundingMetaData({
        checkoutId: "",
        externalReference: "",
        fee: new Fee(),
        paymentType: PaymentType.UNDEFINED_PAYMENT_TYPE,
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
