import { describe, expect, it } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const wallet1 = accounts.get("wallet_1")!;
const wallet2 = accounts.get("wallet_2")!;

describe("review-protocol", () => {
  it("ensures simnet is initialized", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("prevents non-authorized review assignment", () => {
    const { result } = simnet.callPublicFn(
      "review-protocol",
      "assign-reviewer",
      [Cl.uint(1), Cl.principal(wallet2)],
      wallet1
    );
    expect(result).toBeErr(Cl.uint(2000));
  });

  it("prevents review from non-reviewer", () => {
    const { result } = simnet.callPublicFn(
      "review-protocol",
      "submit-review",
      [
        Cl.uint(1),
        Cl.uint(8),
        Cl.stringUtf8("Good methodology"),
        Cl.bufferFromHex("abcd1234"),
      ],
      wallet1
    );
    expect(result).toBeErr(Cl.uint(2005));
  });
});
