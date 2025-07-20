import { describe, expect, it } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const wallet1 = accounts.get("wallet_1")!;

describe("governance", () => {
  it("ensures simnet is initialized", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("only deployer can create proposals", () => {
    const { result } = simnet.callPublicFn(
      "governance",
      "create-proposal",
      [
        Cl.stringUtf8("Increase review rewards"),
        Cl.stringUtf8("Proposal to double reviewer token rewards"),
        Cl.uint(100),
      ],
      wallet1
    );
    expect(result).toBeErr(Cl.uint(5000));
  });

  it("deployer can create proposals", () => {
    const { result } = simnet.callPublicFn(
      "governance",
      "create-proposal",
      [
        Cl.stringUtf8("Update parameters"),
        Cl.stringUtf8("Adjust voting duration"),
        Cl.uint(100),
      ],
      deployer
    );
    expect(result).toBeOk(Cl.uint(1));
  });
});
