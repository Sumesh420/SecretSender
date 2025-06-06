import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface verificationEmailProps {
  username: string;
  otp: string;
}

export default function verificationEmail({
  username,
  otp,
}: verificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fallbackFontFamily="monospace"
          fontFamily="CommitMono"
          fontStyle="normal"
          fontWeight={400}
          webFont={{
            url: "https://react.email/fonts/commit-mono/commit-mono-regular.ttf",
            format: "truetype",
          }}
        />
        <Preview>Here&apos;s your verification code: {otp}</Preview>
        <Section>
            <Row>
                <Heading as="h2">Hello {username},</Heading>
            </Row>
            <Row>
                <Text>
                    ThankYou for registeration. Please use following verfication code to complete your registeration
                </Text>
            </Row>
            <Row>
                <Text>{otp}</Text>
            </Row>
            <Row>
                <Text>
                    If you did not request this code, please ignore this email
                </Text>
            </Row>
        </Section>
      </Head>
    </Html>
  );
}
