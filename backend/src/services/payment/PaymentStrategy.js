import Payment from "../../models/payment.js";

export class PaymentStrategy {
    async pay(paymentData) {
        throw new Error("Method 'pay' must be implemented.");
    }
}

export class CashPaymentStrategy extends PaymentStrategy {
    async pay(paymentData) {
        // cash payment logic
        const payment = new Payment({
            ...paymentData,
            method: "cash",
            status: "pending"
        });
        await payment.save();
        return {
            payment,
            message: "Cash payment recorded. Please settle physically.",
            type: "manual"
        };
    }
}

export class PayPalPaymentStrategy extends PaymentStrategy {
    async pay(paymentData) {
        // paypal payment logic
        const payment = new Payment({
            ...paymentData,
            method: "paypal",
            status: "processing"
        });
        await payment.save();
        // Here you would integrate the PayPal Orders API
        return {
            payment,
            checkoutUrl: `https://sandbox.paypal.com/checkoutnow?token=MOCK_TOKEN_${payment._id}`,
            type: "redirect"
        };
    }
}

export class PaymentContext {
    constructor(paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    setStrategy(paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    async executePayment(paymentData) {
        if (!this.paymentStrategy) {
            throw new Error("Payment Strategy not set");
        }
        return await this.paymentStrategy.pay(paymentData);
    }
}

export const StrategyFactory = {
    getStrategy(gateway) {
        switch (gateway?.toLowerCase()) {
            case "paypal":
                return new PayPalPaymentStrategy();
            case "cash":
            default:
                return new CashPaymentStrategy();
        }
    }
};