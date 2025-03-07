package num

import (
	"fmt"
	"testing"

	shopspringDecimal "github.com/shopspring/decimal"
	"github.com/stretchr/testify/require"
)

func TestToShopspring(t *testing.T) {
	type args struct {
		d *Decimal
	}
	tests := []struct {
		name       string
		args       args
		want       shopspringDecimal.Decimal
		extraCheck func(t *testing.T, d shopspringDecimal.Decimal)
	}{
		{
			name: "conversion success",
			args: args{
				d: &Decimal{
					Value: "-12.34566",
				},
			},
			want: shopspringDecimal.New(-1234566, -5),
			extraCheck: func(t *testing.T, d shopspringDecimal.Decimal) {
				dec, err := shopspringDecimal.NewFromString("-12.34566")
				require.Nilf(t, err, "failed to parse decimal from string")
				require.Truef(t, dec.Equal(d), "%s not equal to %s", dec, d)
			},
		},
		{
			name: "conversion success",
			args: args{
				d: &Decimal{},
			},
			want: shopspringDecimal.RequireFromString("0"),
			extraCheck: func(t *testing.T, d shopspringDecimal.Decimal) {
				dec, err := shopspringDecimal.NewFromString("0")
				require.Nilf(t, err, "failed to parse decimal from string")
				require.Truef(t, dec.Equal(d), "%s not equal to %s", dec, d)
			},
		},
		{
			name: "conversion success",
			args: args{
				d: &Decimal{
					Value: "2000",
				},
			},
			want: shopspringDecimal.New(2, 3),
			extraCheck: func(t *testing.T, d shopspringDecimal.Decimal) {
				dec, err := shopspringDecimal.NewFromString("2000")
				require.Nilf(t, err, "failed to parse decimal from string")
				require.Truef(t, dec.Equal(d), "%s not equal to %s", dec, d)
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := tt.args.d.ToShopspring()
			if !got.Equal(tt.want) {
				t.Errorf("DecimalToShopspringDecimal() = %v, want %v", got, tt.want)
			}
			if tt.extraCheck != nil {
				tt.extraCheck(t, got)
			}
		})
	}
}

func TestFromShopspringDecimal(t *testing.T) {
	type args struct {
		d shopspringDecimal.Decimal
	}
	tests := []struct {
		name          string
		args          args
		want          *Decimal
		wantShoppring shopspringDecimal.Decimal
	}{
		{
			name: "1",
			args: args{
				d: shopspringDecimal.New(1, 3),
			},
			want: &Decimal{
				Value: "1000",
			},
			wantShoppring: shopspringDecimal.RequireFromString("1000"),
		},
		{
			name: "2",
			args: args{
				d: shopspringDecimal.New(2, 3),
			},
			want: &Decimal{
				Value: "2000",
			},
			wantShoppring: shopspringDecimal.RequireFromString("2000"),
		},
		{
			name: "3",
			args: args{
				d: shopspringDecimal.RequireFromString("123.6454123344657809"),
			},
			want: &Decimal{
				Value: "123.6454123344657809",
			},
			wantShoppring: shopspringDecimal.RequireFromString("123.6454123344657809"),
		},
		{
			name: "4",
			args: args{
				d: shopspringDecimal.RequireFromString("-1123.76454123344657809"),
			},
			want: &Decimal{
				Value: "-1123.76454123344657809",
			},
			wantShoppring: shopspringDecimal.RequireFromString("-1123.76454123344657809"),
		},
		{
			name: "4",
			args: args{
				d: shopspringDecimal.RequireFromString("112376454123344657809"),
			},
			want: &Decimal{
				Value: "112376454123344657809",
			},
			wantShoppring: shopspringDecimal.RequireFromString("112376454123344657809"),
		},
		{
			name: "5",
			args: args{
				d: shopspringDecimal.RequireFromString("9999999999999999999999"),
			},
			want: &Decimal{
				Value: "9999999999999999999999",
			},
			wantShoppring: shopspringDecimal.RequireFromString("9999999999999999999999"),
		},
		{
			name: "5",
			args: args{
				d: shopspringDecimal.RequireFromString("-9999999999999999999999"),
			},
			want: &Decimal{
				Value: "-9999999999999999999999",
			},
			wantShoppring: shopspringDecimal.RequireFromString("-9999999999999999999999"),
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := FromShopspringDecimal(tt.args.d)
			if !got.Equal(tt.want) {
				t.Errorf("ShopspringDecimalToDecimal() = %v, want %v", got, tt.want)
			}

			// construct shopspring decimal from got string
			gotShopspring, err := shopspringDecimal.NewFromString(got.GetValue())
			if err != nil {
				t.Errorf("no error expected trying to construct shopspring decimal from string: %v", err)
			}

			// reverse check
			require.Truef(
				t,
				gotShopspring.Equal(tt.wantShoppring),
				fmt.Sprintf(
					"%s not equal to %s",
					gotShopspring,
					tt.wantShoppring,
				),
			)
		})
	}
}

func TestSpecificTest(t *testing.T) {
	a := shopspringDecimal.New(2000000, 0)
	b := shopspringDecimal.New(1000, 0)
	c := a.Div(b)
	cStr := c.String()
	_ = cStr
	d := FromShopspringDecimal(c)
	_ = d
}
