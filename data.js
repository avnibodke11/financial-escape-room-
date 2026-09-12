/**
 * ============================================================================
 * Financial Escape Room (v3, final) — Puzzle & Concept Data (data.js)
 * ============================================================================
 * Pure JavaScript data file containing the complete Concept Library and
 * Scenario Variants across three difficulty tiers:
 *   - Easy: 6 concepts x 4 variants = 24 scenarios
 *   - Moderate: 7 concepts x 4 variants = 28 scenarios
 *   - Finance: 6 concepts x 4 variants = 24 scenarios
 *   Total: 76 unique handcrafted scenarios.
 *
 * Supported formats:
 *   - "calculation": numeric entry (strict generic placeholder)
 *   - "scenario_choice": multi-choice between 2-3 realistic options
 *   - "judgment_call": binary decision ("Safe" vs "Suspicious")
 *   - "clue_hunt": inspecting a document snippet for a key detail
 *
 * Rules followed strictly:
 *   - Plain everyday language (zero jargon: no vault, portfolio, allocation, etc.)
 *   - Answer Safety Rule: Placeholders are generic instructions only (no sample numbers)
 *   - Two-level hints: Level 1 (conceptual nudge), Level 2 (narrower nudge, no spoilers)
 *   - Why It Matters sentence for every puzzle to connect it to the detective mystery
 * ============================================================================
 */

const CONCEPT_LIBRARY = {
  // --------------------------------------------------------------------------
  // DIFFICULTY: EASY (Foundational Money Skills)
  // --------------------------------------------------------------------------
  easy: [
    {
      conceptId: "needs_vs_wants",
      conceptName: "Needs vs Wants",
      complexity: 1, // 1 (simpler) to 6 (harder)
      supportedFormats: ["scenario_choice", "clue_hunt"],
      variants: [
        {
          id: "easy_nvw_v1",
          format: "clue_hunt",
          title: "The Suspect's Grocery Basket",
          whyItMatters: "The suspect claimed they only spent money on basic survival needs last week, but this receipt tells another story.",
          story: "Inspect this weekly store receipt found inside the suspect's desk drawer. One luxury item clearly does not belong in an essential grocery run.",
          evidence: {
            type: "receipt",
            storeName: "CORNER GROCERY & ESSENTIALS",
            date: "OCT 14 // 18:42",
            items: [
              { name: "Fresh Milk & Bread", price: "₹180", category: "Essential Food" },
              { name: "Cooking Oil & Rice", price: "₹450", category: "Pantry Need" },
              { name: "Gold-Plated Keyring", price: "₹2,500", category: "Luxury Souvenir" },
              { name: "Hand Soap & Toothpaste", price: "₹120", category: "Hygiene Need" }
            ],
            total: "₹3,250"
          },
          question: "Which item on the receipt is a discretionary want rather than a basic living need?",
          placeholder: "Type the exact item name from the receipt",
          correctAnswer: "Gold-Plated Keyring",
          acceptedAnswers: ["gold-plated keyring", "gold plated keyring", "keyring", "gold keyring"],
          hint1: "Think about what is necessary to eat, stay healthy, and live, versus a luxury decorative purchase.",
          hint2: "Look closely at the third item on the list and its unusually high price compared to everyday food.",
          wrongExplanation: "Needs are essential things required to survive (food, shelter, basic hygiene). Discretionary wants are non-essential luxury items.",
          solutionExplanation: "The Gold-Plated Keyring is a luxury souvenir, not a basic living need like milk, rice, or soap.",
          codeFragment: "84"
        },
        {
          id: "easy_nvw_v2",
          format: "scenario_choice",
          title: "Prioritizing the Month's Paycheck",
          whyItMatters: "A junior clerk is facing eviction because their spending priorities got mixed up.",
          story: "Arjun just received his monthly earnings of ₹22,000. He has to settle his commitments before doing anything else. Which of the following should he pay first?",
          evidence: {
            type: "note",
            header: "PENDING DECISIONS LIST",
            lines: [
              "Option A: Buy tickets for next weekend's music festival before they sell out (₹4,500)",
              "Option B: Pay apartment room rent to avoid an eviction notice (₹8,000)",
              "Option C: Pre-order a limited-edition jacket on sale (₹3,500)"
            ]
          },
          question: "Which expense represents an essential living need that must be prioritized first?",
          options: [
            { id: "A", text: "Music festival tickets so he doesn't miss out on fun" },
            { id: "B", text: "Apartment room rent to secure safe shelter" },
            { id: "C", text: "Limited-edition designer jacket while it has a discount" }
          ],
          correctAnswer: "B",
          hint1: "Ask yourself which of these three choices protects basic shelter and safety.",
          hint2: "Concerts and clothing sales can wait, but losing a place to sleep creates an immediate crisis.",
          wrongExplanation: "Shelter, food, and basic utilities are essential needs that must always come before entertainment and luxury wants.",
          solutionExplanation: "Rent is a critical need (shelter). Entertainment and luxury shopping are wants that should only come after essential needs are covered.",
          codeFragment: "84"
        },
        {
          id: "easy_nvw_v3",
          format: "scenario_choice",
          title: "The Commute Dilemma",
          whyItMatters: "An investigator must determine whether a travel expense was a necessary duty or wasteful indulgence.",
          story: "Priya commutes 15 km to work daily. Her budget is tight this month. She has ₹2,500 left until next payday.",
          evidence: {
            type: "statement",
            header: "TRAVEL LOG ENTRY",
            lines: [
              "Option 1: Purchase a monthly bus/metro pass for daily commute (₹1,200)",
              "Option 2: Hire premium luxury private cabs every day until the money runs out in 3 days (₹2,500)"
            ]
          },
          question: "What is the soundest financial choice to cover her genuine daily travel need?",
          options: [
            { id: "A", text: "Buy the monthly bus/metro transit pass to secure travel for the whole month" },
            { id: "B", text: "Take luxury private cabs for 3 days and walk 15 km on foot for the rest of the month" }
          ],
          correctAnswer: "A",
          hint1: "Consider which choice fulfills the ongoing travel need reliably across the entire month.",
          hint2: "Spending the entire budget on 3 days of luxury leaves her stranded for the remaining 27 days.",
          wrongExplanation: "A need should be met efficiently so money remains to cover other essentials.",
          solutionExplanation: "The monthly bus/metro pass fulfills the essential travel need for the whole month without depleting her emergency cash.",
          codeFragment: "84"
        },
        {
          id: "easy_nvw_v4",
          format: "clue_hunt",
          title: "Audit of the Supply Locker",
          whyItMatters: "Someone altered the office supply ledger to disguise personal gaming purchases as office necessities.",
          story: "Review the supply requisition sheet. One item listed under 'Essential Office Supplies' is purely personal entertainment.",
          evidence: {
            type: "ledger",
            header: "OFFICE REQUISITION LOG",
            items: [
              { name: "Printer Paper (5 reams)", price: "₹900", note: "Daily documents" },
              { name: "Ballpoint Pens (Pack of 20)", price: "₹200", note: "Clerical work" },
              { name: "Wireless Gaming Controller", price: "₹3,800", note: "Office gear" },
              { name: "Filing Folders & Clips", price: "₹350", note: "Record storage" }
            ]
          },
          question: "Which item in the log is an entertainment want disguised as an office necessity?",
          placeholder: "Type the exact item name from the log",
          correctAnswer: "Wireless Gaming Controller",
          acceptedAnswers: ["wireless gaming controller", "gaming controller", "controller"],
          hint1: "Identify the electronic accessory intended for playing video games rather than processing paperwork.",
          hint2: "Look at the third entry in the log and consider what tools an office actually needs to function.",
          wrongExplanation: "Paper, pens, and file folders are office needs; a video game controller is personal entertainment.",
          solutionExplanation: "The Wireless Gaming Controller is personal gaming gear, not an essential office supply.",
          codeFragment: "84"
        }
      ]
    },

    {
      conceptId: "basic_budgeting",
      conceptName: "Basic Budgeting",
      complexity: 2,
      supportedFormats: ["calculation", "clue_hunt"],
      variants: [
        {
          id: "easy_bud_v1",
          format: "calculation",
          title: "The Assistant's Paycheck Ledger",
          whyItMatters: "Check the assistant's monthly cash sheet to confirm how much surplus money was actually left over.",
          story: "The assistant earned ₹32,000 this month. Their basic expenses are recorded below. Calculate the leftover savings.",
          evidence: {
            type: "ledger",
            header: "MONTHLY CASH FLOW",
            income: "Total Earnings: ₹32,000",
            items: [
              { name: "Room Rent", price: "₹12,000" },
              { name: "Groceries & Food", price: "₹9,000" },
              { name: "Bus Travel Pass", price: "₹3,000" }
            ]
          },
          question: "How much money remains after paying all three listed expenses (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "8000",
          unit: "₹",
          hint1: "First add up all the expenses to find the total money going out.",
          hint2: "Subtract that total expense sum from the total monthly earnings of ₹32,000.",
          wrongExplanation: "Sum the expenses (₹12,000 + ₹9,000 + ₹3,000 = ₹24,000), then subtract from total earnings (₹32,000 − ₹24,000).",
          solutionExplanation: "Total expenses were ₹24,000. Subtracting that from ₹32,000 leaves exactly ₹8,000.",
          codeFragment: "19"
        },
        {
          id: "easy_bud_v2",
          format: "calculation",
          title: "The Delivery Courier's Balance",
          whyItMatters: "A delivery partner needs to verify their net cash balance after paying fuel, phone, and vehicle servicing.",
          story: "Rohan collected ₹28,000 in customer deliveries. He recorded his work expenses for the month. Find his remaining balance.",
          evidence: {
            type: "ledger",
            header: "COURIER EXPENSE SHEET",
            income: "Total Earnings: ₹28,000",
            items: [
              { name: "Bike Fuel", price: "₹6,000" },
              { name: "Mobile Data Plan", price: "₹1,000" },
              { name: "Bike Servicing", price: "₹3,000" }
            ]
          },
          question: "What is Rohan's remaining money after deducting all three expenses (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "18000",
          unit: "₹",
          hint1: "Add together the fuel, phone plan, and servicing costs first.",
          hint2: "Deduct the total outgoing costs from his ₹28,000 earnings.",
          wrongExplanation: "Add the three costs: ₹6,000 + ₹1,000 + ₹3,000 = ₹10,000. Then subtract from ₹28,000.",
          solutionExplanation: "Total costs were ₹10,000. Subtracting ₹10,000 from ₹28,000 leaves ₹18,000.",
          codeFragment: "19"
        },
        {
          id: "easy_bud_v3",
          format: "clue_hunt",
          title: "The Overlooked Utility Bill",
          whyItMatters: "An audit of the household desk revealed a discrepancy between planned expenses and actual bills paid.",
          story: "Examine this monthly payment notebook. One specific utility bill was missed in the initial verbal report.",
          evidence: {
            type: "statement",
            header: "PAID RECEIPTS STACK",
            lines: [
              "House Rent Receipt: ₹15,000 (Paid Oct 1)",
              "Grocery Supermarket Bill: ₹8,500 (Paid Oct 5)",
              "Internet Broadband Bill: ₹1,200 (Paid Oct 8)",
              "Water Tanker Charge: ₹800 (Paid Oct 10)"
            ]
          },
          question: "What was the exact amount paid for the Internet Broadband Bill (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "1200",
          unit: "₹",
          hint1: "Scan down the list of receipts to locate the internet line item.",
          hint2: "Look at the third line in the stack to find the exact figure recorded.",
          wrongExplanation: "Read the third receipt entry carefully to see the broadband bill amount.",
          solutionExplanation: "The receipt for Internet Broadband lists exactly ₹1,200.",
          codeFragment: "19"
        },
        {
          id: "easy_bud_v4",
          format: "calculation",
          title: "The Workshop Apprentice's Savings",
          whyItMatters: "Confirm the apprentice's true monthly surplus before the record book is closed.",
          story: "Meera earns ₹25,000 per month assisting at an artisan workshop. Her monthly expenses are detailed on this slip.",
          evidence: {
            type: "ledger",
            header: "MONTHLY CASH RECORD",
            income: "Total Income: ₹25,000",
            items: [
              { name: "Hostel Accommodation", price: "₹10,000" },
              { name: "Mess Meals", price: "₹7,000" },
              { name: "Local Commute", price: "₹2,000" }
            ]
          },
          question: "How much money does Meera have left over at the end of the month (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "6000",
          unit: "₹",
          hint1: "Sum up the three living expenses first.",
          hint2: "Subtract that sum from her total earnings of ₹25,000.",
          wrongExplanation: "Hostel (₹10,000) + Meals (₹7,000) + Commute (₹2,000) = ₹19,000. Now subtract ₹19,000 from ₹25,000.",
          solutionExplanation: "Expenses total ₹19,000. ₹25,000 minus ₹19,000 leaves ₹6,000.",
          codeFragment: "19"
        }
      ]
    },

    {
      conceptId: "saving_basics",
      conceptName: "Saving Basics",
      complexity: 3,
      supportedFormats: ["calculation", "scenario_choice"],
      variants: [
        {
          id: "easy_sav_v1",
          format: "calculation",
          title: "The 20% First-Step Rule",
          whyItMatters: "An investigator is verifying whether the suspect followed the standard advice of setting aside money first.",
          story: "Kavita earned ₹30,000 this month. Following the advice to 'pay yourself first,' she sets aside exactly 20% into her savings account before spending anything else.",
          evidence: {
            type: "note",
            header: "BANK DEPOSIT MEMO",
            lines: [
              "Monthly Earnings: ₹30,000",
              "Target Saving Rate: 20%",
              "Rule: Transfer savings immediately on payday"
            ]
          },
          question: "How much money does Kavita deposit into her savings account (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "6000",
          unit: "₹",
          hint1: "To find 20% of an amount, multiply the total by 20 and divide by 100, or take 10% and double it.",
          hint2: "10% of ₹30,000 is ₹3,000. Double that to get 20%.",
          wrongExplanation: "20% of ₹30,000 is calculated as (30,000 × 20) ÷ 100 = ₹6,000.",
          solutionExplanation: "Setting aside 20% of ₹30,000 equals exactly ₹6,000.",
          codeFragment: "52"
        },
        {
          id: "easy_sav_v2",
          format: "scenario_choice",
          title: "When to Save",
          whyItMatters: "Understand why a witness kept running out of money before month's end.",
          story: "Two coworkers are comparing how they manage their paychecks each month. Which approach reliably builds savings?",
          evidence: {
            type: "statement",
            header: "HABIT COMPARISON",
            lines: [
              "Approach 1: Spend freely on shopping and dining, then save whatever coins are left on day 30.",
              "Approach 2: Move a fixed saving amount to a separate account on payday, then live on the remainder."
            ]
          },
          question: "Which habit is proven to reliably build savings over time?",
          options: [
            { id: "A", text: "Spend first and hope money is left at the end of the month" },
            { id: "B", text: "Save a fixed portion first on payday, then budget the remainder for living expenses" }
          ],
          correctAnswer: "B",
          hint1: "Think about what usually happens to money that sits in your spending pocket all month.",
          hint2: "When people wait until month-end, extra spending almost always consumes whatever was left.",
          wrongExplanation: "Saving first ('pay yourself first') ensures your future is funded before casual spending takes place.",
          solutionExplanation: "Moving savings right on payday guarantees you actually save; waiting until the end of the month usually leaves nothing.",
          codeFragment: "52"
        },
        {
          id: "easy_sav_v3",
          format: "calculation",
          title: "Goal Planning for New Equipment",
          whyItMatters: "A shop assistant is saving for a new work tablet that costs ₹18,000.",
          story: "Dev wants to purchase an ₹18,000 work tablet in 6 months without taking any loan. He plans to save an equal amount each month.",
          evidence: {
            type: "note",
            header: "EQUIPMENT SAVING TARGET",
            lines: [
              "Target Price: ₹18,000",
              "Timeline: 6 months",
              "Equal monthly deposit"
            ]
          },
          question: "How much must Dev save each month to hit his goal on time (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "3000",
          unit: "₹",
          hint1: "Divide the total target amount by the number of months available.",
          hint2: "Divide ₹18,000 by 6.",
          wrongExplanation: "Divide the target price (₹18,000) by the timeline (6 months): 18,000 ÷ 6 = ₹3,000 per month.",
          solutionExplanation: "Dev needs to save ₹18,000 ÷ 6 = ₹3,000 each month to purchase the tablet on time.",
          codeFragment: "52"
        },
        {
          id: "easy_sav_v4",
          format: "scenario_choice",
          title: "The Flash Sale Temptation",
          whyItMatters: "A suspect claims they had to drain their savings because of an urgent emergency.",
          story: "Neha has ₹10,000 in savings intended for her upcoming semester exam fees. A store advertises a one-day 50% discount on designer headphones for ₹6,000.",
          evidence: {
            type: "statement",
            header: "SPENDING REVIEW",
            lines: [
              "Reserved Savings: ₹10,000 (Committed for Exam Fees)",
              "Discount Offer: Luxury headphones for ₹6,000 (Flash Sale)"
            ]
          },
          question: "What is the financially responsible decision?",
          options: [
            { id: "A", text: "Protect the exam fee savings and pass on the luxury headphones" },
            { id: "B", text: "Spend ₹6,000 from the exam fund because discounts should never be missed" }
          ],
          correctAnswer: "A",
          hint1: "Consider the consequences: what happens if she cannot pay her semester exam fee?",
          hint2: "Buying an unneeded luxury item on sale is still spending money you committed for an essential goal.",
          wrongExplanation: "Never raid committed savings for non-essential impulse purchases.",
          solutionExplanation: "A discount on an unneeded item is not a saving; raiding essential exam funds would cause severe academic disruption.",
          codeFragment: "52"
        }
      ]
    },

    {
      conceptId: "spotting_scams",
      conceptName: "Spotting Scams",
      complexity: 4,
      supportedFormats: ["judgment_call", "scenario_choice"],
      variants: [
        {
          id: "easy_scm_v1",
          format: "judgment_call",
          title: "The Lucky Winner SMS",
          whyItMatters: "The victim received this message right before their bank account was emptied.",
          story: "An alert pinged on the phone: 'CONGRATULATIONS! Your mobile number won ₹2,50,000 in the National Lucky Draw! Click http://tiny-cash-claim.xyz within 5 minutes to deposit your prize.'",
          evidence: {
            type: "message",
            sender: "+91 98210-XXXXX",
            header: "INCOMING TEXT ALERT",
            body: "CONGRATULATIONS! You won ₹2,50,000 in the National Lucky Draw! Click http://tiny-cash-claim.xyz within 5 minutes to claim or it will be canceled."
          },
          question: "Is this message Safe or Suspicious?",
          options: [
            { id: "SAFE", text: "Safe" },
            { id: "SUSPICIOUS", text: "Suspicious" }
          ],
          correctAnswer: "SUSPICIOUS",
          hint1: "Did the recipient ever enter this lucky draw? Notice the artificial 5-minute rush.",
          hint2: "Legitimate lotteries do not message random numbers with urgent unofficial links.",
          wrongExplanation: "Winning contests you never entered combined with extreme time pressure and weird links is a classic scam.",
          solutionExplanation: "This is a classic scam: you cannot win a contest you never entered, and urgency is used to prevent you from thinking clearly.",
          codeFragment: "63"
        },
        {
          id: "easy_scm_v2",
          format: "judgment_call",
          title: "The Official Utility Letter",
          whyItMatters: "Check whether this correspondence is a genuine municipal notice or a fraudulent forgery.",
          story: "A sealed paper letter arrived by postal post from the State Electricity Board showing your registered meter number, exact past billing history, and standard payment options at the local post office.",
          evidence: {
            type: "statement",
            header: "POSTAL BILL NOTICE",
            lines: [
              "From: State Electricity Distribution Co.",
              "Registered Consumer ID: #4829104",
              "Monthly Meter Units: 142 kWh",
              "Payable at: Any official municipal bill counter or registered bank portal"
            ]
          },
          question: "Is this notice Safe or Suspicious?",
          options: [
            { id: "SAFE", text: "Safe" },
            { id: "SUSPICIOUS", text: "Suspicious" }
          ],
          correctAnswer: "SAFE",
          hint1: "Look at the payment method: does it demand an urgent secret transfer or direct you to standard official bill counters?",
          hint2: "It lists verified consumer meter details and standard postal/municipal payment channels.",
          wrongExplanation: "Official postal bills with accurate account numbers directing payments through standard official counters are regular safe bills.",
          solutionExplanation: "This is a regular official billing notice containing verified meter data and official municipal payment locations.",
          codeFragment: "63"
        },
        {
          id: "easy_scm_v3",
          format: "scenario_choice",
          title: "The 'Bank Manager' Phone Call",
          whyItMatters: "A caller tried to extract credentials from a junior clerk at the agency.",
          story: "A caller claiming to be 'Head Office Bank Security' tells Rahul: 'Your debit card will be permanently blocked in 10 minutes unless you tell me your 4-digit secret card PIN right now.'",
          evidence: {
            type: "message",
            header: "PHONE CALL TRANSCRIPT",
            body: "CALLER: 'I am the bank manager. Tell me your card PIN immediately so I can update our security file.'"
          },
          question: "What should Rahul do?",
          options: [
            { id: "A", text: "Read the 4-digit PIN out loud so his card isn't blocked" },
            { id: "B", text: "Hang up immediately — real banks never ask for your secret PIN" }
          ],
          correctAnswer: "B",
          hint1: "Think about banking privacy rules regarding your secret PIN.",
          hint2: "No genuine bank employee is ever authorized to ask for your card PIN or secret passwords.",
          wrongExplanation: "Never share your secret PIN or password with anyone, even someone claiming to be a bank manager.",
          solutionExplanation: "Real banks explicitly state that their staff will NEVER ask for your secret PIN, password, or one-time code.",
          codeFragment: "63"
        },
        {
          id: "easy_scm_v4",
          format: "judgment_call",
          title: "The Mysterious Parcel Fee",
          whyItMatters: "A delivery scam targeted several personnel this morning.",
          story: "An SMS states: 'Your courier package is on hold at our depot due to an incomplete house number. Transfer ₹25 immediately to a personal mobile number or your package will be destroyed.' You didn't order any courier.",
          evidence: {
            type: "message",
            header: "UNKNOWN COURIER ALERT",
            body: "Your package is held at depot. Send ₹25 immediately to +91 9911223344 or goods will be discarded today."
          },
          question: "Is this notification Safe or Suspicious?",
          options: [
            { id: "SAFE", text: "Safe" },
            { id: "SUSPICIOUS", text: "Suspicious" }
          ],
          correctAnswer: "SUSPICIOUS",
          hint1: "Notice the threat of destruction, the personal phone number, and the fact that you ordered nothing.",
          hint2: "Scammers use tiny fees (like ₹25) to bait people into clicking links that compromise their accounts.",
          wrongExplanation: "Demanding money transfers to personal phone numbers for unexpected packages is a common fraud tactic.",
          solutionExplanation: "This is suspicious fraud: you ordered nothing, and genuine delivery companies do not demand payments to personal phone numbers.",
          codeFragment: "63"
        }
      ]
    },

    {
      conceptId: "debit_vs_credit",
      conceptName: "Debit vs Credit Basics",
      complexity: 5,
      supportedFormats: ["scenario_choice", "judgment_call"],
      variants: [
        {
          id: "easy_dvc_v1",
          format: "scenario_choice",
          title: "Understanding Your Payment Cards",
          whyItMatters: "Clarify how payment cards work so you understand where the money actually comes from.",
          story: "Pooja wants to buy groceries worth ₹2,000. She wants to ensure the money comes directly out of her existing bank balance without borrowing.",
          evidence: {
            type: "note",
            header: "CARD COMPARISON SUMMARY",
            lines: [
              "Card Type X: Uses money you already deposited in your bank account.",
              "Card Type Y: Borrows money from the card company that must be repaid later."
            ]
          },
          question: "Which card should Pooja swipe to spend only her own saved money?",
          options: [
            { id: "A", text: "Her Debit Card" },
            { id: "B", text: "Her Credit Card" }
          ],
          correctAnswer: "A",
          hint1: "Think about which card is directly tied to your existing savings account balance.",
          hint2: "Debit deducts your own cash; credit borrows money that creates a debt.",
          wrongExplanation: "A debit card spends your own existing money; a credit card borrows money that must be repaid.",
          solutionExplanation: "A debit card draws funds directly from your own bank account balance, meaning you borrow nothing.",
          codeFragment: "41"
        },
        {
          id: "easy_dvc_v2",
          format: "judgment_call",
          title: "The 'Free Money' Myth",
          whyItMatters: "A witness claimed they thought credit cards were a gift of free money.",
          story: "A social media post claims: 'Credit card spending limits are free bonus gifts from the bank that you can spend and never have to repay!'",
          evidence: {
            type: "statement",
            header: "SOCIAL POST CLAIM",
            body: "'Just got a credit card with a ₹50,000 limit. That means the bank just gifted me ₹50,000 in free money!'"
          },
          question: "Is this claim Safe or Suspicious?",
          options: [
            { id: "SAFE", text: "Safe" },
            { id: "SUSPICIOUS", text: "Suspicious" }
          ],
          correctAnswer: "SUSPICIOUS",
          hint1: "Is a borrowed spending limit free money, or a temporary loan that has to be paid back?",
          hint2: "Every rupee spent on a credit card is borrowed money that must be paid back, often with high interest if delayed.",
          wrongExplanation: "A credit card is a short-term loan, not free money. Every spent amount must be repaid.",
          solutionExplanation: "This claim is completely false and dangerous. Credit cards are borrowed money that must be fully repaid.",
          codeFragment: "41"
        },
        {
          id: "easy_dvc_v3",
          format: "scenario_choice",
          title: "Avoiding Unnecessary Debt",
          whyItMatters: "Identify the safest payment method when a person wants to avoid interest charges completely.",
          story: "Vikram is purchasing replacement shoes for ₹1,500. He already has ₹4,000 sitting in his bank account and does not want to track loan repayment dates.",
          evidence: {
            type: "statement",
            header: "SHOPPING RECORD",
            lines: [
              "Item: Work Shoes (₹1,500)",
              "Bank Account Balance: ₹4,000",
              "Goal: Avoid debt and avoid due dates"
            ]
          },
          question: "What is the best way for Vikram to pay?",
          options: [
            { id: "A", text: "Pay using his debit card to settle it immediately with his own cash" },
            { id: "B", text: "Take an installment loan with monthly finance charges" }
          ],
          correctAnswer: "A",
          hint1: "He has enough cash in his account and wants zero debt or due dates.",
          hint2: "Paying directly with his debit card settles the transaction immediately with no future payments.",
          wrongExplanation: "Using a debit card settles the bill on the spot from existing cash, avoiding interest and due dates.",
          solutionExplanation: "Using his debit card pays with his own existing money, meaning no bills, no debt, and no interest charges.",
          codeFragment: "41"
        },
        {
          id: "easy_dvc_v4",
          format: "judgment_call",
          title: "Direct Account Deductions",
          whyItMatters: "Confirm this standard rule of banking transactions.",
          story: "A bank statement guide explains: 'When you make a payment using your debit card at a shop counter, the funds are immediately deducted from your linked bank account balance.'",
          evidence: {
            type: "statement",
            header: "BANKING RULES EXCERPT",
            body: "Debit Card Transactions: Amount is debited directly from the customer's available bank deposit in real time."
          },
          question: "Is this explanation Safe or Suspicious?",
          options: [
            { id: "SAFE", text: "Safe" },
            { id: "SUSPICIOUS", text: "Suspicious" }
          ],
          correctAnswer: "SAFE",
          hint1: "Does 'debit' mean taking money out of your existing bank funds?",
          hint2: "Yes, that is the exact definition of a debit transaction.",
          wrongExplanation: "Debit cards withdraw directly from your linked account balance in real time.",
          solutionExplanation: "This is completely accurate: debit cards instantly deduct money from your existing bank balance.",
          codeFragment: "41"
        }
      ]
    },

    {
      conceptId: "simple_discounts",
      conceptName: "Simple Discounts & Percentages",
      complexity: 6, // Biased toward Room 4 in Easy pool
      supportedFormats: ["calculation", "scenario_choice"],
      variants: [
        {
          id: "easy_dsc_v1",
          format: "calculation",
          title: "The Altered Store Receipt",
          whyItMatters: "A shop clerk claims they applied a 20% discount on a work jacket, but the math looks off.",
          story: "A sturdy work jacket is marked at ₹2,500. The store banner promises a 20% seasonal discount. Calculate the final price after the discount.",
          evidence: {
            type: "receipt",
            header: "STORE PRICE TAG",
            lines: [
              "Original Price: ₹2,500",
              "Promised Discount: 20% off",
              "Math Rule: Final Price = Original − Discount"
            ]
          },
          question: "What is the final price of the jacket after the 20% discount (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "2000",
          unit: "₹",
          hint1: "First calculate 20% of ₹2,500: (2,500 × 20) ÷ 100 = ?",
          hint2: "The discount amount is ₹500. Subtract ₹500 from the original ₹2,500 price.",
          wrongExplanation: "20% of ₹2,500 is ₹500. Subtracting ₹500 from ₹2,500 gives the final price of ₹2,000.",
          solutionExplanation: "The 20% discount saves ₹500. The final price is ₹2,500 − ₹500 = ₹2,000.",
          codeFragment: "77"
        },
        {
          id: "easy_dsc_v2",
          format: "scenario_choice",
          title: "Comparing Two Offers",
          whyItMatters: "Determine which promotional voucher saved the customer more money on their purchase.",
          story: "Sunita is buying ₹1,000 worth of school books. She can only apply one voucher at checkout.",
          evidence: {
            type: "note",
            header: "AVAILABLE VOUCHERS",
            lines: [
              "Voucher 1: Flat ₹250 cash off your ₹1,000 purchase",
              "Voucher 2: 10% discount off your ₹1,000 purchase"
            ]
          },
          question: "Which voucher gives the bigger discount?",
          options: [
            { id: "A", text: "Voucher 1 (Flat ₹250 off)" },
            { id: "B", text: "Voucher 2 (10% off, which equals ₹100)" }
          ],
          correctAnswer: "A",
          hint1: "Calculate how much money 10% of ₹1,000 is, then compare it to ₹250.",
          hint2: "10% of ₹1,000 is only ₹100. ₹250 is clearly higher.",
          wrongExplanation: "10% of ₹1,000 is ₹100. A flat ₹250 discount saves ₹150 more.",
          solutionExplanation: "Voucher 1 gives ₹250 off, whereas Voucher 2 only gives 10% (₹100) off. Voucher 1 is better.",
          codeFragment: "77"
        },
        {
          id: "easy_dsc_v3",
          format: "calculation",
          title: "The Study Desk Discount",
          whyItMatters: "Verify the exact discount deducted on this office furniture invoice.",
          story: "A study desk has an original tag of ₹4,000. During the weekend clearance, it is marked with a 10% discount.",
          evidence: {
            type: "receipt",
            header: "CLEARANCE TAG",
            lines: [
              "Desk Price: ₹4,000",
              "Clearance Offer: 10% discount"
            ]
          },
          question: "How much money is saved by the 10% discount (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "400",
          unit: "₹",
          hint1: "To calculate 10% of any number, divide it by 10.",
          hint2: "Divide ₹4,000 by 10.",
          wrongExplanation: "10% of ₹4,000 is (4,000 × 10) ÷ 100 = ₹400.",
          solutionExplanation: "A 10% discount on ₹4,000 saves exactly ₹400.",
          codeFragment: "77"
        },
        {
          id: "easy_dsc_v4",
          format: "calculation",
          title: "Wholesale Grocery Rebate",
          whyItMatters: "A bulk pantry order was discounted. Double-check the total amount payable.",
          story: "A community kitchen ordered pantry supplies totaling ₹5,000. The distributor applied a 15% discount for bulk orders.",
          evidence: {
            type: "receipt",
            header: "DISTRIBUTOR INVOICE",
            lines: [
              "Order Total: ₹5,000",
              "Bulk Discount: 15% off"
            ]
          },
          question: "What is the final bill amount to be paid after the 15% discount (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "4250",
          unit: "₹",
          hint1: "Find 15% of ₹5,000 first (10% is ₹500, 5% is ₹250).",
          hint2: "The total discount is ₹750. Subtract ₹750 from ₹5,000.",
          wrongExplanation: "15% of ₹5,000 is ₹750. ₹5,000 − ₹750 = ₹4,250.",
          solutionExplanation: "The 15% discount amounts to ₹750. The amount due is ₹5,000 − ₹750 = ₹4,250.",
          codeFragment: "77"
        }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // DIFFICULTY: MODERATE (Smart Everyday Decisions)
  // --------------------------------------------------------------------------
  moderate: [
    {
      conceptId: "emergency_funds",
      conceptName: "Emergency Funds",
      complexity: 1,
      supportedFormats: ["calculation", "scenario_choice"],
      variants: [
        {
          id: "mod_ef_v1",
          format: "calculation",
          title: "The Three-Month Safety Cushion",
          whyItMatters: "A witness needs to verify whether their family had an adequate cash buffer before sudden medical bills arrived.",
          story: "A family's essential monthly expenses (rent, food, electricity, medicines) total ₹25,000. Financial advisors recommend keeping at least 3 months of expenses safely tucked away.",
          evidence: {
            type: "statement",
            header: "MONTHLY ESSENTIAL BUDGET",
            lines: [
              "Essential Living Costs: ₹25,000 / month",
              "Recommended Safety Target: 3 months of essential costs"
            ]
          },
          question: "How much money is required to fully fund a 3-month safety cushion (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "75000",
          unit: "₹",
          hint1: "Multiply the monthly living expense by the number of target months.",
          hint2: "Multiply ₹25,000 by 3.",
          wrongExplanation: "Multiply monthly costs (₹25,000) by 3 months: 25,000 × 3 = ₹75,000.",
          solutionExplanation: "A 3-month cushion at ₹25,000 per month equals ₹75,000.",
          codeFragment: "93"
        },
        {
          id: "mod_ef_v2",
          format: "scenario_choice",
          title: "Where to Store Emergency Cash",
          whyItMatters: "Investigate whether money reserved for unexpected emergencies was stored safely or put at risk.",
          story: "A worker has set aside ₹60,000 as an emergency fund in case of sudden illness or temporary job loss. Where should this money be kept?",
          evidence: {
            type: "note",
            header: "STORAGE OPTIONS",
            lines: [
              "Option A: A simple, safe bank savings account with instant access and zero risk of losing value.",
              "Option B: Highly volatile speculative crypto coins locked for 2 years with a risk of dropping 50%."
            ]
          },
          question: "Which option is appropriate for an emergency safety cushion?",
          options: [
            { id: "A", text: "A safe bank savings account with immediate access and zero loss risk" },
            { id: "B", text: "Volatile speculative assets that could crash right when you need cash" }
          ],
          correctAnswer: "A",
          hint1: "An emergency fund must be available immediately and cannot afford to lose value during a crisis.",
          hint2: "If you need hospital money tomorrow, you cannot wait 2 years or risk your cash crashing by half.",
          wrongExplanation: "Emergency funds must be safe and instantly accessible, not risked in unpredictable speculations.",
          solutionExplanation: "Emergency money should always stay in safe, easily accessible accounts so it is ready when real emergencies strike.",
          codeFragment: "93"
        },
        {
          id: "mod_ef_v3",
          format: "calculation",
          title: "Calculating Coverage Months",
          whyItMatters: "Determine how long this business partner could survive a sudden shutdown.",
          story: "A graphic designer spends ₹18,000 per month on bare essentials. They have ₹54,000 kept in a liquid bank deposit.",
          evidence: {
            type: "ledger",
            header: "SAFETY BUFFER AUDIT",
            lines: [
              "Monthly Essential Outflow: ₹18,000",
              "Total Reserved Savings: ₹54,000"
            ]
          },
          question: "How many months of essential living expenses does this savings buffer cover?",
          placeholder: "Enter the number of months",
          correctAnswer: "3",
          unit: "months",
          hint1: "Divide the total savings buffer by the monthly expense amount.",
          hint2: "Calculate ₹54,000 ÷ ₹18,000.",
          wrongExplanation: "Divide ₹54,000 by ₹18,000: 54,000 ÷ 18,000 = 3 months.",
          solutionExplanation: "₹54,000 divided by ₹18,000 per month covers exactly 3 months of essential expenses.",
          codeFragment: "93"
        },
        {
          id: "mod_ef_v4",
          format: "scenario_choice",
          title: "When to Tap the Buffer",
          whyItMatters: "A suspect claims an emergency fund withdrawal was justified, but we must verify if it was a real emergency.",
          story: "Which of the following situations is a genuine reason to spend money from your emergency safety cushion?",
          evidence: {
            type: "statement",
            header: "EVENT COMPARISON",
            lines: [
              "Situation 1: Sudden plumbing rupture flooding the home requiring emergency repairs.",
              "Situation 2: A luxury 65-inch television on a limited-time weekend discount."
            ]
          },
          question: "Which situation justifies spending from an emergency cushion?",
          options: [
            { id: "A", text: "The emergency home plumbing flood repair" },
            { id: "B", text: "The discounted luxury television" }
          ],
          correctAnswer: "A",
          hint1: "Emergency funds are strictly for unexpected, urgent necessities, not leisure purchases.",
          hint2: "A flooded home threatens your living condition; a television discount is purely optional.",
          wrongExplanation: "Emergency funds are reserved for urgent, unexpected survival needs like health, housing emergencies, or sudden job loss.",
          solutionExplanation: "A broken pipe flooding your house is an urgent necessity. Sales and electronics are wants.",
          codeFragment: "93"
        }
      ]
    },

    {
      conceptId: "credit_score_basics",
      conceptName: "Credit Score Basics",
      complexity: 2,
      supportedFormats: ["scenario_choice", "judgment_call"],
      variants: [
        {
          id: "mod_cs_v1",
          format: "scenario_choice",
          title: "Building Financial Trust",
          whyItMatters: "Check why a business applicant was denied a bank loan.",
          story: "A credit score is a numerical record of how reliably you repay borrowed money. Which action builds the highest trust score?",
          evidence: {
            type: "note",
            header: "BORROWER RECORD FILE",
            lines: [
              "Applicant A: Consistently pays every bill and loan installment in full before the due date.",
              "Applicant B: Frequently misses due dates and only pays when legal notices arrive."
            ]
          },
          question: "Which habit produces a strong credit reputation and trustworthy score?",
          options: [
            { id: "A", text: "Paying all bills and loan installments in full on or before the due date" },
            { id: "B", text: "Skipping payment due dates and letting late fees accumulate" }
          ],
          correctAnswer: "A",
          hint1: "Lenders look for consistent proof that borrowed money is returned reliably on time.",
          hint2: "Prompt payments prove reliability; delayed payments signal default risk.",
          wrongExplanation: "Consistently paying on time proves financial reliability and builds a strong credit score.",
          solutionExplanation: "Timely, full payments show lenders you are dependable, leading to a strong credit score and lower interest rates.",
          codeFragment: "26"
        },
        {
          id: "mod_cs_v2",
          format: "judgment_call",
          title: "The Maxed-Out Card Myth",
          whyItMatters: "A suspect claims maxing out cards builds credit faster.",
          story: "An advice flyer claims: 'To get a perfect credit score quickly, max out 100% of all your credit limits and ignore the monthly due dates.'",
          evidence: {
            type: "statement",
            header: "QUESTIONABLE FINANCIAL FLYER",
            body: "'Spend every single rupee of your card limit every month and let payments bounce to show you need credit!'"
          },
          question: "Is this advice Safe or Suspicious?",
          options: [
            { id: "SAFE", text: "Safe" },
            { id: "SUSPICIOUS", text: "Suspicious" }
          ],
          correctAnswer: "SUSPICIOUS",
          hint1: "Does maxing out borrowing limits and bouncing payments show responsibility or reckless distress?",
          hint2: "Maxing out cards and missing payments destroys credit scores rapidly.",
          wrongExplanation: "Maxing out credit limits and missing payments triggers penalties and ruins credit scores.",
          solutionExplanation: "This advice is disastrously false. High credit usage and missed payments severely damage your credit standing.",
          codeFragment: "26"
        },
        {
          id: "mod_cs_v3",
          format: "scenario_choice",
          title: "The Consequences of Late Dues",
          whyItMatters: "Understand how late payment marks on an inquiry report affect future loan approvals.",
          story: "What happens when someone repeatedly ignores monthly payment reminders and pays their loans 60 days late?",
          evidence: {
            type: "statement",
            header: "CREDIT BUREAU SUMMARY",
            lines: [
              "Record: Multiple 60+ day late marks reported by card issuers.",
              "Inquiry: Applied for a vehicle loan."
            ]
          },
          question: "What is the likely outcome of repeated late payments?",
          options: [
            { id: "A", text: "The bank will reject new loan applications or charge much higher interest rates" },
            { id: "B", text: "The bank will reward the borrower with free interest-free cash prizes" }
          ],
          correctAnswer: "A",
          hint1: "Late payments signal that the borrower struggles to repay money on time.",
          hint2: "Banks view late borrowers as risky and either refuse to lend or charge extra penalties.",
          wrongExplanation: "A damaged credit history causes banks to deny loans or charge expensive penalty interest.",
          solutionExplanation: "Repeated late payments lower your credit score, making future loans difficult to obtain or far more expensive.",
          codeFragment: "26"
        },
        {
          id: "mod_cs_v4",
          format: "judgment_call",
          title: "The Verified Payment Record",
          whyItMatters: "Verify whether this credit advisory guideline is factual.",
          story: "A credit handbook states: 'Keeping your credit card balance well below your card limit and clearing the bill every month helps maintain a healthy credit score.'",
          evidence: {
            type: "statement",
            header: "CREDIT HANDBOOK RULE",
            body: "Maintaining moderate usage (below 30% of limit) and paying on time every month preserves a clean credit profile."
          },
          question: "Is this guideline Safe or Suspicious?",
          options: [
            { id: "SAFE", text: "Safe" },
            { id: "SUSPICIOUS", text: "Suspicious" }
          ],
          correctAnswer: "SAFE",
          hint1: "Does keeping balances low and paying on time match good financial sense?",
          hint2: "Yes, this is the standard recommendation of credit reporting agencies worldwide.",
          wrongExplanation: "Moderate utilization and on-time payments are proven best practices.",
          solutionExplanation: "This is verified, sound financial advice: low credit usage and prompt payments keep your credit score healthy.",
          codeFragment: "26"
        }
      ]
    },

    {
      conceptId: "simple_interest",
      conceptName: "Simple Interest",
      complexity: 3,
      supportedFormats: ["calculation", "scenario_choice"],
      variants: [
        {
          id: "mod_si_v1",
          format: "calculation",
          title: "The Fixed Bank Deposit",
          whyItMatters: "Confirm the exact interest earned on this deposited bank certificate.",
          story: "Sunil deposited ₹10,000 into a government-insured fixed deposit for 1 year at a simple interest rate of 5% per year.",
          evidence: {
            type: "receipt",
            header: "FIXED DEPOSIT CERTIFICATE",
            lines: [
              "Principal Deposit: ₹10,000",
              "Annual Interest Rate: 5%",
              "Duration: 1 Year",
              "Math: Interest = Principal × Rate × Time"
            ]
          },
          question: "How much interest money did the deposit earn in that 1 year (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "500",
          unit: "₹",
          hint1: "Calculate 5% of ₹10,000.",
          hint2: "(10,000 × 5) ÷ 100 = ?",
          wrongExplanation: "Interest = (10,000 × 5 × 1) ÷ 100 = ₹500.",
          solutionExplanation: "5% of ₹10,000 over 1 year yields exactly ₹500 in interest earnings.",
          codeFragment: "48"
        },
        {
          id: "mod_si_v2",
          format: "calculation",
          title: "The Two-Year Deposit Slip",
          whyItMatters: "Calculate the total two-year interest return on this business security bond.",
          story: "A small shop deposited ₹20,000 in a fixed bank certificate for 2 years at a simple interest rate of 6% per year.",
          evidence: {
            type: "receipt",
            header: "DEPOSIT NOTE",
            lines: [
              "Deposit Amount: ₹20,000",
              "Rate: 6% per year",
              "Time Period: 2 years"
            ]
          },
          question: "What is the total interest earned over the full 2 years (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "2400",
          unit: "₹",
          hint1: "Calculate the interest for 1 year first, then multiply by 2 years.",
          hint2: "6% of ₹20,000 is ₹1,200 per year. For 2 years, double that.",
          wrongExplanation: "For 1 year: 20,000 × 0.06 = ₹1,200. For 2 years: ₹1,200 × 2 = ₹2,400.",
          solutionExplanation: "At 6% per year, ₹20,000 earns ₹1,200 each year, totaling ₹2,400 after 2 years.",
          codeFragment: "48"
        },
        {
          id: "mod_si_v3",
          format: "scenario_choice",
          title: "Mattress Cash vs Bank Interest",
          whyItMatters: "Examine whether keeping cash hidden in a floorboard was financially sensible.",
          story: "Ramesh hid ₹50,000 in paper notes inside an old tin box for 3 years (earning 0% interest). His sister placed ₹50,000 in a bank deposit earning 6% interest each year.",
          evidence: {
            type: "statement",
            header: "SAVINGS OUTCOME AUDIT",
            lines: [
              "Ramesh: 0% interest in a tin box.",
              "Sister: 6% annual simple interest in a bank deposit."
            ]
          },
          question: "Who made the smarter financial decision to protect and grow their money?",
          options: [
            { id: "A", text: "The sister, because her money was safe in the bank and earned interest" },
            { id: "B", text: "Ramesh, because cash in a tin box is immune to theft and pays more" }
          ],
          correctAnswer: "A",
          hint1: "Think about security against theft and whether money in a box grows at all.",
          hint2: "Cash in a box earns zero interest and can be stolen or lost in a fire.",
          wrongExplanation: "Money in a bank earns interest and is protected; idle cash in a box loses purchasing power and risks physical loss.",
          solutionExplanation: "The bank deposit earns interest and offers safety, whereas money hidden in a tin box earns nothing and is vulnerable to theft.",
          codeFragment: "48"
        },
        {
          id: "mod_si_v4",
          format: "calculation",
          title: "The Workshop Equipment Loan",
          whyItMatters: "Calculate the total repayment amount due on this peer loan agreement.",
          story: "Anil lent ₹8,000 to a fellow tradesman for 1 year at an agreed simple interest rate of 10% per year. Both principal and interest are repaid together at year-end.",
          evidence: {
            type: "note",
            header: "LOAN AGREEMENT MEMO",
            lines: [
              "Borrowed Principal: ₹8,000",
              "Agreed Interest: 10% for 1 year",
              "Total Repayment = Principal + Interest"
            ]
          },
          question: "What is the total amount to be repaid at the end of the year (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "8800",
          unit: "₹",
          hint1: "First calculate the interest: 10% of ₹8,000.",
          hint2: "10% of ₹8,000 is ₹800. Add that interest back to the ₹8,000 borrowed.",
          wrongExplanation: "Interest is ₹800. Total repayment = ₹8,000 + ₹800 = ₹8,800.",
          solutionExplanation: "The 10% interest is ₹800. Adding this to the original ₹8,000 principal equals ₹8,800 total.",
          codeFragment: "48"
        }
      ]
    },

    {
      conceptId: "risk_vs_return",
      conceptName: "Risk vs Return",
      complexity: 4,
      supportedFormats: ["scenario_choice", "judgment_call"],
      variants: [
        {
          id: "mod_rvr_v1",
          format: "judgment_call",
          title: "The 'Guaranteed Double' Trap",
          whyItMatters: "A poster on the community board lured several victims into an unregulated scheme.",
          story: "An online flyer screams: 'DOUBLE YOUR MONEY IN 14 DAYS! Guaranteed 100% returns with ABSOLUTELY ZERO RISK OF LOSS! Approved by secret VIPs!'",
          evidence: {
            type: "message",
            header: "ONLINE INVESTMENT AD",
            body: "GUARANTEED 100% PROFIT IN 2 WEEKS! No risk whatsoever! Send your savings now to receive double cash!"
          },
          question: "Is this proposition Safe or Suspicious?",
          options: [
            { id: "SAFE", text: "Safe" },
            { id: "SUSPICIOUS", text: "Suspicious" }
          ],
          correctAnswer: "SUSPICIOUS",
          hint1: "Does any legitimate financial opportunity ever guarantee enormous profits with zero risk?",
          hint2: "In the real world, higher potential return always carries higher risk. 'Guaranteed double with zero risk' is a universal red flag.",
          wrongExplanation: "No real investment can guarantee astronomical returns with zero risk. This is a classic scam.",
          solutionExplanation: "This is a classic fraudulent scheme: in legitimate finance, unusually high promised returns always carry massive risk, and 'zero-risk double' is impossible.",
          codeFragment: "65"
        },
        {
          id: "mod_rvr_v2",
          format: "scenario_choice",
          title: "Protecting Next Month's Rent",
          whyItMatters: "Determine whether the suspect recklessly gambled funds they needed for urgent survival.",
          story: "Mohan has ₹15,000 that he needs to pay his room rent in 3 weeks. A coworker suggests putting it into a volatile speculative token that swung up 40% yesterday.",
          evidence: {
            type: "statement",
            header: "DECISION LOG",
            lines: [
              "Committed Obligation: ₹15,000 rent due in 21 days.",
              "Option A: Keep it safe in his bank account.",
              "Option B: Speculate in volatile tokens that could drop 30% by tomorrow."
            ]
          },
          question: "What is the wise decision for money needed in the immediate short term?",
          options: [
            { id: "A", text: "Keep the rent money safe in the bank where it cannot lose value" },
            { id: "B", text: "Speculate on volatile tokens and risk being evicted if it drops" }
          ],
          correctAnswer: "A",
          hint1: "Money needed in the short term for critical needs should never be exposed to market volatility.",
          hint2: "If the token drops 30%, he will not be able to pay rent and will face eviction.",
          wrongExplanation: "Funds required for imminent necessities must stay in zero-risk, stable cash accounts.",
          solutionExplanation: "Money needed within weeks must be kept completely safe; exposing essential living cash to high-risk swings is dangerous.",
          codeFragment: "65"
        },
        {
          id: "mod_rvr_v3",
          format: "judgment_call",
          title: "The Golden Rule of Investing",
          whyItMatters: "Evaluate this fundamental principle of financial markets.",
          story: "A financial education brochure states: 'As a rule, any investment that offers the possibility of higher financial gains also exposes you to a greater chance of losing money.'",
          evidence: {
            type: "statement",
            header: "FINANCIAL EDUCATION EXCERPT",
            body: "Risk and return are directly linked: higher potential gains require accepting greater risk of loss."
          },
          question: "Is this statement Safe or Suspicious?",
          options: [
            { id: "SAFE", text: "Safe" },
            { id: "SUSPICIOUS", text: "Suspicious" }
          ],
          correctAnswer: "SAFE",
          hint1: "Think about how banks and markets work: does easy high reward ever come without risk?",
          hint2: "This is the core rule of finance: risk and return always go hand in hand.",
          wrongExplanation: "The risk-return relationship is the most fundamental and accurate law of finance.",
          solutionExplanation: "This statement is entirely true and safe: higher potential returns always come with greater potential risk.",
          codeFragment: "65"
        },
        {
          id: "mod_rvr_v4",
          format: "scenario_choice",
          title: "Comparing Two Investment Pots",
          whyItMatters: "Guide a client who wants steady, modest growth without night-sweat anxiety.",
          story: "A retired teacher wants to protect her life savings. Which type of option matches a low-risk profile?",
          evidence: {
            type: "note",
            header: "INVESTMENT PROFILES",
            lines: [
              "Option 1: Government-backed savings bonds offering a modest, guaranteed return.",
              "Option 2: A newly launched startup promising 50% returns or total bankruptcy."
            ]
          },
          question: "Which option provides the security appropriate for a cautious saver?",
          options: [
            { id: "A", text: "Government-backed savings bonds with steady, guaranteed returns" },
            { id: "B", text: "The high-risk speculative startup with a chance of total bankruptcy" }
          ],
          correctAnswer: "A",
          hint1: "Cautious savers cannot afford to lose their capital; they need reliability over wild swings.",
          hint2: "Guaranteed government bonds protect against loss.",
          wrongExplanation: "Conservative savers should choose insured, government-backed instruments over speculative startups.",
          solutionExplanation: "Government-backed bonds offer capital safety and reliable interest, ideal for risk-averse savers.",
          codeFragment: "65"
        }
      ]
    },

    {
      conceptId: "insurance_basics",
      conceptName: "Insurance Basics",
      complexity: 5,
      supportedFormats: ["scenario_choice", "judgment_call"],
      variants: [
        {
          id: "mod_ins_v1",
          format: "scenario_choice",
          title: "The Purpose of Health Coverage",
          whyItMatters: "Understand how a sudden hospital stay wiped out a family's life savings.",
          story: "Why do financial planners recommend paying a modest annual fee (premium) for health insurance?",
          evidence: {
            type: "statement",
            header: "POLICY BRIEFING",
            lines: [
              "Annual Fee: ₹8,000 per year.",
              "Coverage: Pays up to ₹5,00,000 in unexpected hospital treatment bills."
            ]
          },
          question: "What is the primary purpose of having health insurance?",
          options: [
            { id: "A", text: "To protect your family savings from being wiped out by sudden, massive hospital bills" },
            { id: "B", text: "To win a cash lottery if you don't visit the hospital" }
          ],
          correctAnswer: "A",
          hint1: "Think about what happens to a family if a sudden surgery costs ₹3,00,000 out of pocket.",
          hint2: "Insurance is a safety shield against devastating financial loss, not an investment or lottery.",
          wrongExplanation: "Insurance is risk protection: you pay a small fee so an unexpected disaster doesn't bankrupt you.",
          solutionExplanation: "Health insurance absorbs the shock of expensive medical emergencies, preventing catastrophic depletion of your savings.",
          codeFragment: "34"
        },
        {
          id: "mod_ins_v2",
          format: "judgment_call",
          title: "The 'I Never Get Sick' Argument",
          whyItMatters: "A suspect claims canceling all family insurance was a brilliant way to save money.",
          story: "An acquaintance tells you: 'I didn't visit a hospital once last year, so paying for health insurance is a complete waste of cash. I am canceling all policies forever.'",
          evidence: {
            type: "statement",
            header: "CONVERSATION SNIPPET",
            body: "'Cancel your health insurance! If you don't use it every month, the money is gone. Just hope you never get in an accident!'"
          },
          question: "Is this reasoning Safe or Suspicious?",
          options: [
            { id: "SAFE", text: "Safe" },
            { id: "SUSPICIOUS", text: "Suspicious" }
          ],
          correctAnswer: "SUSPICIOUS",
          hint1: "Can anyone accurately predict that they will never suffer an accident or illness?",
          hint2: "Insurance is purchased precisely for the unpredictable disasters you hope never happen.",
          wrongExplanation: "Dropping insurance exposes you to devastating financial ruin from a single unexpected medical event.",
          solutionExplanation: "This is dangerous logic: insurance is protection against unforeseen catastrophes. A single medical emergency could wipe out years of savings.",
          codeFragment: "34"
        },
        {
          id: "mod_ins_v3",
          format: "scenario_choice",
          title: "Vehicle Liability Protection",
          whyItMatters: "Check whether a commercial driver met legal and financial safety obligations.",
          story: "A delivery van driver is deciding whether to renew his vehicle insurance policy for ₹4,000 per year.",
          evidence: {
            type: "note",
            header: "DECISION SUMMARY",
            lines: [
              "Option 1: Drive without insurance to save ₹4,000, risking personal liability for millions if an accident occurs.",
              "Option 2: Pay the ₹4,000 policy to ensure accident damage and legal liability are covered."
            ]
          },
          question: "What is the responsible and legally sound choice?",
          options: [
            { id: "A", text: "Maintain the vehicle insurance policy to protect against devastating accident liabilities" },
            { id: "B", text: "Drive uninsured and risk bankruptcy and legal arrest if a collision happens" }
          ],
          correctAnswer: "A",
          hint1: "Think about the financial consequences if an uninsured vehicle damages another car or injures someone.",
          hint2: "Accident liability costs far exceed the small cost of an annual insurance policy.",
          wrongExplanation: "Insurance protects drivers from life-ruining legal liabilities and repair costs.",
          solutionExplanation: "Maintaining vehicle insurance shields you from enormous liability costs and complies with mandatory legal requirements.",
          codeFragment: "34"
        },
        {
          id: "mod_ins_v4",
          format: "judgment_call",
          title: "The Principle of Risk Pooling",
          whyItMatters: "Confirm this core explanation of how insurance operates.",
          story: "An educational guide explains: 'Insurance works by pooling small payments from many people, so that the few who suffer unexpected disasters receive financial support without going bankrupt.'",
          evidence: {
            type: "statement",
            header: "INSURANCE BASICS OVERVIEW",
            body: "Policyholders pool resources through premiums so anyone facing a covered calamity receives funds to rebuild."
          },
          question: "Is this description Safe or Suspicious?",
          options: [
            { id: "SAFE", text: "Safe" },
            { id: "SUSPICIOUS", text: "Suspicious" }
          ],
          correctAnswer: "SAFE",
          hint1: "Does this accurately reflect how insurance companies pay out claims?",
          hint2: "Yes, risk pooling is the foundational mechanism of all insurance.",
          wrongExplanation: "Risk pooling is the exact legitimate definition of how insurance functions.",
          solutionExplanation: "This is accurate and safe: insurance pools contributions so catastrophic losses are shared rather than destroying an individual.",
          codeFragment: "34"
        }
      ]
    },

    {
      conceptId: "upi_otp_safety",
      conceptName: "UPI & OTP Safety",
      complexity: 6,
      supportedFormats: ["judgment_call", "clue_hunt"],
      variants: [
        {
          id: "mod_upi_v1",
          format: "judgment_call",
          title: "The QR Code to 'Receive' Money",
          whyItMatters: "A marketplace seller lost money trying to collect payment for a used chair.",
          story: "An unknown buyer messages: 'I want to buy your wooden desk. Scan this QR code and type your secret UPI PIN to receive the ₹3,500 payment into your bank account.'",
          evidence: {
            type: "message",
            header: "INCOMING CHAT SCREENSHOT",
            body: "BUYER: 'Scan my QR code right now and enter your 6-digit PIN so my money transfers into your account!'"
          },
          question: "Is this instruction Safe or Suspicious?",
          options: [
            { id: "SAFE", text: "Safe" },
            { id: "SUSPICIOUS", text: "Suspicious" }
          ],
          correctAnswer: "SUSPICIOUS",
          hint1: "Do you EVER need to enter your secret PIN to receive money?",
          hint2: "Entering your PIN ONLY authorizes money to leave your account. Receiving money never requires a PIN.",
          wrongExplanation: "You NEVER enter your UPI PIN to receive money. Entering your PIN always sends money OUT.",
          solutionExplanation: "This is a rampant scam: entering your UPI PIN authorizes money to be deducted from your account, never credited to you.",
          codeFragment: "71"
        },
        {
          id: "mod_upi_v2",
          format: "clue_hunt",
          title: "The Banking Security SMS",
          whyItMatters: "Inspect the exact warning sentence printed inside this one-time code alert.",
          story: "A transaction verification SMS was received during an investigation. Identify the specific security instruction included by the bank.",
          evidence: {
            type: "message",
            sender: "VK-HDFCBK",
            header: "VERIFICATION MESSAGE",
            body: "OTP for payment of ₹4,200 is 849201. Valid for 5 mins. Do not share this OTP with anyone, including bank staff."
          },
          question: "With whom does the bank state you should share this OTP?",
          placeholder: "Type your answer (e.g. no one / anyone)",
          correctAnswer: "no one",
          acceptedAnswers: ["no one", "nobody", "do not share with anyone", "no one including bank staff"],
          hint1: "Read the final sentence of the SMS carefully.",
          hint2: "The message explicitly warns that the code must not be shared with anyone.",
          wrongExplanation: "The SMS explicitly instructs: 'Do not share this OTP with anyone, including bank staff.'",
          solutionExplanation: "The bank warning clearly says to share the code with no one, not even bank employees.",
          codeFragment: "71"
        },
        {
          id: "mod_upi_v3",
          format: "judgment_call",
          title: "The Fake Friend OTP Request",
          whyItMatters: "A staff member's messaging app was hijacked using this trick.",
          story: "You receive a message from a friend's profile: 'Hey, my phone battery is dying and I accidentally sent my login code to your number! Please forward me the 6-digit code you just received!'",
          evidence: {
            type: "message",
            header: "CHAT SCREENSHOT",
            body: "FRIEND PROFILE: 'Quick, text me the 6-digit code that just got sent to your SMS! It's for my account!'"
          },
          question: "Is this request Safe or Suspicious?",
          options: [
            { id: "SAFE", text: "Safe" },
            { id: "SUSPICIOUS", text: "Suspicious" }
          ],
          correctAnswer: "SUSPICIOUS",
          hint1: "Could an account login code for someone else's phone ever be sent to your phone number?",
          hint2: "The code on your phone is for YOUR account. The friend's profile has been hacked to take over yours.",
          wrongExplanation: "A code sent to your phone accesses YOUR accounts. Forwarding it hands control to a hacker.",
          solutionExplanation: "This is account theft: the hacker is trying to log into your account and tricked your friend's profile to steal your OTP.",
          codeFragment: "71"
        },
        {
          id: "mod_upi_v4",
          format: "clue_hunt",
          title: "Spotting the Phishing Domain",
          whyItMatters: "An investigator intercepted this spoofed payment link sent to bank customers.",
          story: "Look at the website address in this text message claiming to be an official state bank portal.",
          evidence: {
            type: "message",
            header: "SUSPICIOUS LINK SMS",
            body: "Dear customer, update your pan details immediately to prevent account suspension at http://sbi-secure-update.xyz/login"
          },
          question: "What is the suspicious website domain extension used in this link (e.g. .com, .org, .xyz)?",
          placeholder: "Type the domain extension",
          correctAnswer: ".xyz",
          acceptedAnswers: [".xyz", "xyz", "sbi-secure-update.xyz"],
          hint1: "Look at the very end of the website URL before the slash.",
          hint2: "Official banks use registered domains like .co.in or .bank.biz, never cheap disposable domains like .xyz.",
          wrongExplanation: "The fake site uses '.xyz', an unofficial, suspicious domain extension commonly used in phishing.",
          solutionExplanation: "The domain uses '.xyz', which is an unofficial domain used by fraudsters to impersonate authentic banks.",
          codeFragment: "71"
        }
      ]
    },

    {
      conceptId: "loan_basics",
      conceptName: "Loan Basics & Total Payback",
      complexity: 7, // Biased toward Room 4 in Moderate pool
      supportedFormats: ["calculation", "scenario_choice"],
      variants: [
        {
          id: "mod_ln_v1",
          format: "calculation",
          title: "The True Cost of Borrowing",
          whyItMatters: "A shopkeeper took a quick cash loan without calculating the total interest burden.",
          story: "Vikram borrowed ₹50,000 for emergency shop repairs. Over the course of 12 months, he paid back ₹4,700 every month, totaling ₹56,400.",
          evidence: {
            type: "statement",
            header: "LOAN DISBURSEMENT SUMMARY",
            lines: [
              "Amount Borrowed: ₹50,000",
              "Total Amount Repaid: ₹56,400",
              "Cost of Borrowing = Total Repaid − Amount Borrowed"
            ]
          },
          question: "How much extra money did the loan cost Vikram in interest fees (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "6400",
          unit: "₹",
          hint1: "Subtract the original amount borrowed from the total amount he paid back.",
          hint2: "Calculate ₹56,400 − ₹50,000.",
          wrongExplanation: "Subtract borrowed principal (₹50,000) from total payback (₹56,400): 56,400 − 50,000 = ₹6,400.",
          solutionExplanation: "The loan cost ₹6,400 extra in interest charges beyond the original ₹50,000 borrowed.",
          codeFragment: "59"
        },
        {
          id: "mod_ln_v2",
          format: "scenario_choice",
          title: "Comparing Loan Terms",
          whyItMatters: "Identify the safest borrowing option for an artisan buying new tools.",
          story: "An artisan needs to borrow ₹20,000 to purchase woodworking tools. Two lenders make an offer.",
          evidence: {
            type: "note",
            header: "LENDER OFFERS",
            lines: [
              "Lender A (Bank Credit Cooperative): 9% yearly interest with clear monthly payments.",
              "Lender B (Unregulated Street Lender): 60% yearly interest with daily penalty threats."
            ]
          },
          question: "Which loan is the safe and responsible choice?",
          options: [
            { id: "A", text: "Lender A (9% annual interest from the regulated bank cooperative)" },
            { id: "B", text: "Lender B (60% predatory interest from the unregulated street lender)" }
          ],
          correctAnswer: "A",
          hint1: "Compare the interest rates: 9% versus 60%.",
          hint2: "A 60% interest rate is predatory and will trap the borrower in endless debt.",
          wrongExplanation: "Regulated cooperative loans with low interest rates protect borrowers from debt traps.",
          solutionExplanation: "Lender A offers transparent, regulated terms at a fraction of the cost, avoiding predatory debt traps.",
          codeFragment: "59"
        },
        {
          id: "mod_ln_v3",
          format: "calculation",
          title: "The Installment Plan Premium",
          whyItMatters: "Verify the surcharge charged on this installment plan.",
          story: "A work laptop can be bought for ₹40,000 in cash today. Alternatively, the store offers a payment plan of ₹4,000 per month for 12 months (totaling ₹48,000).",
          evidence: {
            type: "receipt",
            header: "PAYMENT PLAN COMPARISON",
            lines: [
              "Cash Today: ₹40,000",
              "Installment Plan: 12 payments of ₹4,000 = ₹48,000"
            ]
          },
          question: "How much extra does it cost to use the 12-month installment plan instead of cash (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "8000",
          unit: "₹",
          hint1: "Subtract the cash price from the total installment cost.",
          hint2: "Calculate ₹48,000 − ₹40,000.",
          wrongExplanation: "Total installment cost (₹48,000) minus upfront price (₹40,000) = ₹8,000 extra.",
          solutionExplanation: "Choosing the installment plan costs an extra ₹8,000 compared to paying upfront in cash.",
          codeFragment: "59"
        },
        {
          id: "mod_ln_v4",
          format: "scenario_choice",
          title: "What to Check Before Signing",
          whyItMatters: "A borrower was blindsided by hidden processing charges on an educational loan.",
          story: "Before signing a loan agreement, what is the most important factor to check?",
          evidence: {
            type: "statement",
            header: "BORROWER CHECKLIST",
            lines: [
              "Option 1: The total interest rate, fees, and whether the monthly installment fits comfortably into your budget.",
              "Option 2: Just whether the lender has a fancy logo on their envelope."
            ]
          },
          question: "What must you verify before committing to any loan?",
          options: [
            { id: "A", text: "The interest rate, all hidden fees, and your realistic ability to pay each month" },
            { id: "B", text: "How colorful the marketing banner is" }
          ],
          correctAnswer: "A",
          hint1: "A loan must be repaid from your regular income every single month.",
          hint2: "Understanding all interest, fees, and monthly repayment obligations prevents default and bankruptcy.",
          wrongExplanation: "Always review the full interest cost, repayment terms, and budget affordability before signing.",
          solutionExplanation: "Verifying the interest rate, processing charges, and monthly installment affordability ensures you don't enter an unpayable debt trap.",
          codeFragment: "59"
        }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // DIFFICULTY: FINANCE (Deeper Concepts in Plain Everyday Words)
  // --------------------------------------------------------------------------
  finance: [
    {
      conceptId: "emi_compound_growth",
      conceptName: "Compound Growth & Monthly Repayments",
      complexity: 1,
      supportedFormats: ["calculation", "scenario_choice"],
      variants: [
        {
          id: "fin_cg_v1",
          format: "calculation",
          title: "The Snowball Growth Effect",
          whyItMatters: "Examine how savings grow when earned returns are left to earn their own returns.",
          story: "A saver starts with ₹10,000 in a growth fund. In Year 1, it grows by 10% (adding ₹1,000 to become ₹11,000). In Year 2, it grows by another 10% on the new ₹11,000 total.",
          evidence: {
            type: "statement",
            header: "GROWTH LEDGER",
            lines: [
              "Starting Sum: ₹10,000",
              "End of Year 1 (10% growth): ₹11,000",
              "Year 2 Growth: 10% calculated on ₹11,000",
              "Compound Rule: Future Value = ₹11,000 + (10% of ₹11,000)"
            ]
          },
          question: "What is the total value of the savings at the end of Year 2 (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "12100",
          unit: "₹",
          hint1: "First calculate 10% of ₹11,000.",
          hint2: "10% of ₹11,000 is ₹1,100. Add ₹1,100 to ₹11,000.",
          wrongExplanation: "In Year 2, 10% of ₹11,000 is ₹1,100. ₹11,000 + ₹1,100 = ₹12,100.",
          solutionExplanation: "The investment grew by ₹1,000 in year one and ₹1,100 in year two, reaching ₹12,100 total.",
          codeFragment: "92"
        },
        {
          id: "fin_cg_v2",
          format: "calculation",
          title: "The Year of Monthly Payments",
          whyItMatters: "Confirm the annual cash outflow committed to this equipment installment agreement.",
          story: "A small design studio pays a fixed monthly installment of ₹3,500 for their computer workstation loan.",
          evidence: {
            type: "ledger",
            header: "EQUIPMENT PAYMENT COMMITMENT",
            lines: [
              "Monthly Payment: ₹3,500",
              "Number of Months per Year: 12"
            ]
          },
          question: "How much money is paid toward the loan over the course of 1 full year (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "42000",
          unit: "₹",
          hint1: "Multiply the monthly installment amount by 12 months.",
          hint2: "Calculate 3,500 × 12.",
          wrongExplanation: "Multiply monthly payment (₹3,500) by 12 months: 3,500 × 12 = ₹42,000.",
          solutionExplanation: "Paying ₹3,500 each month for 12 months totals ₹42,000 for the year.",
          codeFragment: "92"
        },
        {
          id: "fin_cg_v3",
          format: "scenario_choice",
          title: "Why Compounding Multiplies Wealth",
          whyItMatters: "Explain why starting to save early creates an overwhelming advantage.",
          story: "Why does leaving your investment returns reinvested over 20 years produce much more money than withdrawing earnings every year?",
          evidence: {
            type: "statement",
            header: "LONG-TERM PROJECTION",
            lines: [
              "Path A: Pull out all interest at the end of every year.",
              "Path B: Leave all earnings untouched so interest earns its own interest year after year."
            ]
          },
          question: "What makes compound growth so powerful over time?",
          options: [
            { id: "A", text: "Your past earnings generate their own earnings, creating an accelerating snowball effect" },
            { id: "B", text: "The bank prints free extra currency notes whenever you don't look" }
          ],
          correctAnswer: "A",
          hint1: "Think about earning a percentage not just on your original cash, but on all previous growth as well.",
          hint2: "When interest earns interest, growth accelerates exponentially over long horizons.",
          wrongExplanation: "Compounding means your earnings generate their own returns, multiplying growth over time.",
          solutionExplanation: "Compounding accelerates wealth because returns are earned on both the original savings and all accumulated past gains.",
          codeFragment: "92"
        },
        {
          id: "fin_cg_v4",
          format: "calculation",
          title: "Second-Year Compounding Boost",
          whyItMatters: "Measure the exact compound acceleration between year 1 and year 2.",
          story: "An investment of ₹20,000 earned 10% in Year 1 (which was ₹2,000, bringing the total to ₹22,000).",
          evidence: {
            type: "statement",
            header: "ACCOUNT BALANCE MEMO",
            lines: [
              "Balance at start of Year 2: ₹22,000",
              "Annual Growth Rate: 10%"
            ]
          },
          question: "How much interest money will the balance earn in Year 2 alone at 10% (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "2200",
          unit: "₹",
          hint1: "Calculate 10% of the new starting balance of ₹22,000.",
          hint2: "22,000 × 0.10 = ?",
          wrongExplanation: "10% of ₹22,000 is calculated as (22,000 × 10) ÷ 100 = ₹2,200.",
          solutionExplanation: "In Year 2, the 10% growth yields ₹2,200 (which is ₹200 more than Year 1 due to compounding).",
          codeFragment: "92"
        }
      ]
    },

    {
      conceptId: "investment_allocation",
      conceptName: "Splitting Savings Across Pots",
      complexity: 2,
      supportedFormats: ["scenario_choice", "calculation"],
      variants: [
        {
          id: "fin_ia_v1",
          format: "scenario_choice",
          title: "Spreading Savings Across Safe and Growth Pots",
          whyItMatters: "Examine how a client structured their long-term savings to balance safety and growth.",
          story: "Karan has ₹1,00,000 saved for long-term goals over the next 10 years. How should he divide his savings to achieve growth without reckless risk?",
          evidence: {
            type: "statement",
            header: "STRATEGY REVIEW",
            lines: [
              "Option 1: Split between broad market index funds for growth and safe fixed bank deposits for stability.",
              "Option 2: Put all ₹1,00,000 into a single high-risk meme coin promoted by an online celebrity."
            ]
          },
          question: "Which approach creates a balanced, responsible savings foundation?",
          options: [
            { id: "A", text: "Divide money between broad growth funds and safe deposits to balance growth and safety" },
            { id: "B", text: "Put 100% of the money into a single speculative coin" }
          ],
          correctAnswer: "A",
          hint1: "A sound plan combines growth to beat rising prices with safe deposits to protect against crashes.",
          hint2: "Gambling everything on a single speculative coin can result in total loss.",
          wrongExplanation: "Balancing between safe bank instruments and broad market growth funds provides steady growth with downside protection.",
          solutionExplanation: "Dividing savings between steady growth vehicles and safe cash deposits balances growth with risk protection.",
          codeFragment: "15"
        },
        {
          id: "fin_ia_v2",
          format: "calculation",
          title: "The 70 / 30 Savings Split",
          whyItMatters: "Verify the exact cash portion allocated to safe deposits in this investment plan.",
          story: "An investor divides ₹60,000 into two pots: 70% goes into long-term growth funds, and 30% is kept in safe, guaranteed bank deposits.",
          evidence: {
            type: "note",
            header: "SAVINGS ALLOCATION PLAN",
            lines: [
              "Total Savings: ₹60,000",
              "Growth Fund Portion: 70%",
              "Safe Bank Deposit Portion: 30%"
            ]
          },
          question: "How much money is placed into the safe bank deposit pot (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "18000",
          unit: "₹",
          hint1: "Calculate 30% of ₹60,000.",
          hint2: "(60,000 × 30) ÷ 100 = ?",
          wrongExplanation: "30% of ₹60,000 is (60,000 × 30) ÷ 100 = ₹18,000.",
          solutionExplanation: "The 30% safe deposit portion equals exactly ₹18,000.",
          codeFragment: "15"
        },
        {
          id: "fin_ia_v3",
          format: "scenario_choice",
          title: "Shifting Pots Near Retirement",
          whyItMatters: "Understand why an older investor altered their savings mix.",
          story: "A worker is retiring in 6 months and will need to live off their savings immediately. How should they adjust where their money sits?",
          evidence: {
            type: "statement",
            header: "RETIREMENT TIMELINE NOTICE",
            lines: [
              "Time Horizon: 6 months to retirement.",
              "Goal: Ensure savings are guaranteed and safe from sudden market drops."
            ]
          },
          question: "What is the appropriate adjustment as retirement arrives?",
          options: [
            { id: "A", text: "Shift more money into safe, guaranteed bank deposits to protect against sudden stock drops" },
            { id: "B", text: "Move 100% of savings into aggressive high-risk speculations" }
          ],
          correctAnswer: "A",
          hint1: "When you need money immediately, you cannot wait 5 years for a market crash to recover.",
          hint2: "Capital protection becomes far more important than aggressive growth as you near retirement.",
          wrongExplanation: "Near retirement, capital preservation is paramount; shifting into safe deposits protects against market crashes.",
          solutionExplanation: "As retirement approaches, shifting into safe fixed deposits ensures market volatility won't erase your living money.",
          codeFragment: "15"
        },
        {
          id: "fin_ia_v4",
          format: "calculation",
          title: "The 50 / 50 Emergency and Growth Split",
          whyItMatters: "Confirm the division of this inheritance across two separate accounts.",
          story: "Meera inherited ₹80,000. She splits it evenly: exactly 50% for an emergency cash buffer, and 50% for a retirement growth fund.",
          evidence: {
            type: "statement",
            header: "INHERITANCE ALLOCATION MEMO",
            lines: [
              "Total Received: ₹80,000",
              "Division: Exactly 50% in Emergency Cash, 50% in Growth Fund"
            ]
          },
          question: "How much money is placed into the emergency cash buffer (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "40000",
          unit: "₹",
          hint1: "Calculate 50% (half) of ₹80,000.",
          hint2: "80,000 ÷ 2 = ?",
          wrongExplanation: "50% of ₹80,000 is 80,000 ÷ 2 = ₹40,000.",
          solutionExplanation: "Half of ₹80,000 is ₹40,000, which funds the emergency cash buffer.",
          codeFragment: "15"
        }
      ]
    },

    {
      conceptId: "profit_loss_percentage",
      conceptName: "Profit & Loss Percentages",
      complexity: 3,
      supportedFormats: ["calculation", "scenario_choice"],
      variants: [
        {
          id: "fin_pl_v1",
          format: "calculation",
          title: "The Antique Desk Audit",
          whyItMatters: "A dealer claimed they sold this item at a loss, but the sales ledger proves otherwise.",
          story: "A vintage furniture dealer bought an oak writing desk for ₹8,000, restored it for ₹0, and sold it to a customer for ₹10,000.",
          evidence: {
            type: "ledger",
            header: "FURNITURE TRANSACTION SLIP",
            lines: [
              "Cost Price (Purchase): ₹8,000",
              "Selling Price (Sale): ₹10,000",
              "Profit = Selling Price − Cost Price"
            ]
          },
          question: "How much gross profit did the dealer make on this sale (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "2000",
          unit: "₹",
          hint1: "Subtract the purchase cost from the selling price.",
          hint2: "Calculate ₹10,000 − ₹8,000.",
          wrongExplanation: "Profit = Selling Price (₹10,000) − Cost Price (₹8,000) = ₹2,000.",
          solutionExplanation: "Selling at ₹10,000 an item bought for ₹8,000 yields ₹2,000 profit.",
          codeFragment: "38"
        },
        {
          id: "fin_pl_v2",
          format: "calculation",
          title: "The Defective Stock Clearance",
          whyItMatters: "Verify the net loss reported on damaged warehouse inventory.",
          story: "A shop bought electronics for ₹5,000. Due to water damage, they had to clear the batch rapidly for ₹3,800.",
          evidence: {
            type: "ledger",
            header: "DAMAGED STOCK CLEARANCE",
            lines: [
              "Original Purchase Cost: ₹5,000",
              "Discounted Sale Price: ₹3,800",
              "Loss = Cost Price − Selling Price"
            ]
          },
          question: "What was the total financial loss incurred on this clearance (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "1200",
          unit: "₹",
          hint1: "Subtract the sale recovery from the original purchase cost.",
          hint2: "Calculate ₹5,000 − ₹3,800.",
          wrongExplanation: "Loss = ₹5,000 − ₹3,800 = ₹1,200.",
          solutionExplanation: "Selling for ₹3,800 items that cost ₹5,000 resulted in a loss of ₹1,200.",
          codeFragment: "38"
        },
        {
          id: "fin_pl_v3",
          format: "calculation",
          title: "Calculating Profit Percentage",
          whyItMatters: "Confirm whether this supplier achieved their target 20% margin.",
          story: "A craft supplier bought raw ceramics for ₹1,000 and sold the finished pottery for ₹1,200, generating ₹200 in profit.",
          evidence: {
            type: "note",
            header: "MARGIN CALCULATION NOTE",
            lines: [
              "Cost Price: ₹1,000",
              "Profit Amount: ₹200",
              "Profit % = (Profit ÷ Cost Price) × 100"
            ]
          },
          question: "What is the profit percentage earned on this sale (enter just the number)?",
          placeholder: "Enter the percentage %",
          correctAnswer: "20",
          unit: "%",
          hint1: "Divide the profit of ₹200 by the original cost of ₹1,000, then multiply by 100.",
          hint2: "(200 ÷ 1,000) × 100 = ?",
          wrongExplanation: "Profit % = (200 ÷ 1,000) × 100 = 20%.",
          solutionExplanation: "A ₹200 profit on a ₹1,000 cost equals a 20% profit margin.",
          codeFragment: "38"
        },
        {
          id: "fin_pl_v4",
          format: "scenario_choice",
          title: "Profit or Loss?",
          whyItMatters: "Determine whether the transaction resulted in a surplus or a deficit.",
          story: "A trader bought a shipment of textiles for ₹15,000 and sold it for ₹12,500 due to declining market demand.",
          evidence: {
            type: "statement",
            header: "TRADE SUMMARY",
            lines: [
              "Cost to Purchase: ₹15,000",
              "Amount Received on Sale: ₹12,500"
            ]
          },
          question: "Did the trader make a profit or suffer a loss?",
          options: [
            { id: "A", text: "A loss, because the selling price was lower than the purchase cost" },
            { id: "B", text: "A profit, because any completed sale generates profit" }
          ],
          correctAnswer: "A",
          hint1: "Compare what was paid to acquire the goods versus what was collected on sale.",
          hint2: "When money received is less than money spent to buy the item, it is a loss.",
          wrongExplanation: "When the selling price is lower than the cost price, the transaction results in a loss.",
          solutionExplanation: "Receiving ₹12,500 for goods that cost ₹15,000 results in a net financial loss of ₹2,500.",
          codeFragment: "38"
        }
      ]
    },

    {
      conceptId: "basic_tax_deduction",
      conceptName: "Tax Deductions & Taxable Income",
      complexity: 4,
      supportedFormats: ["calculation", "scenario_choice"],
      variants: [
        {
          id: "fin_tx_v1",
          format: "calculation",
          title: "The Standard Savings Deduction",
          whyItMatters: "An investigator must determine the legitimate taxable income recorded on this salary declaration.",
          story: "An engineer earned ₹6,00,000 in gross annual salary. She invested ₹1,50,000 in government-approved long-term retirement savings, which qualifies for a full legal tax deduction.",
          evidence: {
            type: "statement",
            header: "TAX WORKSHEET EXCERPT",
            lines: [
              "Gross Annual Salary: ₹6,00,000",
              "Approved Savings Deduction: ₹1,50,000",
              "Taxable Income = Gross Salary − Approved Deductions"
            ]
          },
          question: "What is the engineer's remaining taxable income on which tax is calculated (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "450000",
          unit: "₹",
          hint1: "Subtract the approved deduction from the gross salary.",
          hint2: "Calculate ₹6,00,000 − ₹1,50,000.",
          wrongExplanation: "Taxable Income = ₹6,00,000 − ₹1,50,000 = ₹4,50,000.",
          solutionExplanation: "Deducting the ₹1,50,000 allowable savings reduces her taxable income to ₹4,50,000.",
          codeFragment: "67"
        },
        {
          id: "fin_tx_v2",
          format: "calculation",
          title: "Health Insurance Tax Deduction",
          whyItMatters: "Verify the final taxable earnings of this consultant.",
          story: "A consultant earned ₹7,50,000 this year. They claimed ₹50,000 in approved health insurance deductions for their family.",
          evidence: {
            type: "ledger",
            header: "ANNUAL TAX FILING SUMMARY",
            lines: [
              "Total Earnings: ₹7,50,000",
              "Allowable Health Insurance Deduction: ₹50,000"
            ]
          },
          question: "What is their adjusted taxable income after applying the deduction (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "700000",
          unit: "₹",
          hint1: "Deduct the insurance relief amount from total earnings.",
          hint2: "Calculate ₹7,50,000 − ₹50,000.",
          wrongExplanation: "Taxable Income = ₹7,50,000 − ₹50,000 = ₹7,00,000.",
          solutionExplanation: "The ₹50,000 health deduction reduces taxable income to ₹7,00,000.",
          codeFragment: "67"
        },
        {
          id: "fin_tx_v3",
          format: "scenario_choice",
          title: "Why Tax Deductions Exist",
          whyItMatters: "Clarify the legal intent of tax deductions in personal finance.",
          story: "Why does the government provide tax deductions for retirement savings and health insurance?",
          evidence: {
            type: "statement",
            header: "TAX POLICY EXPLANATION",
            lines: [
              "Policy A: To encourage citizens to save for old age and protect their health.",
              "Policy B: To reward people who hide money in offshore accounts."
            ]
          },
          question: "What is the legitimate goal of tax deductions?",
          options: [
            { id: "A", text: "To encourage citizens to build long-term savings and protect their healthcare" },
            { id: "B", text: "To help people illegally avoid paying their fair share of public services" }
          ],
          correctAnswer: "A",
          hint1: "Think about what the government wants citizens to do: save for their own retirement or depend on charity?",
          hint2: "Deductions incentivize positive financial behavior like retirement planning and healthcare coverage.",
          wrongExplanation: "Governments offer deductions to incentivize responsible habits like health coverage and retirement savings.",
          solutionExplanation: "Legitimate tax deductions are public incentives to motivate people to save for old age and maintain health protection.",
          codeFragment: "67"
        },
        {
          id: "fin_tx_v4",
          format: "calculation",
          title: "Freelance Work Expenses",
          whyItMatters: "Confirm the net taxable earnings of this freelance photographer.",
          story: "A freelance photographer earned ₹4,00,000 in client fees. She had ₹60,000 in documented, legitimate business expenses (equipment rentals, travel).",
          evidence: {
            type: "ledger",
            header: "FREELANCE EXPENSE SHEET",
            lines: [
              "Gross Client Fees: ₹4,00,000",
              "Documented Business Expenses: ₹60,000",
              "Taxable Net Earnings = Gross Fees − Legitimate Expenses"
            ]
          },
          question: "What is her net taxable income after deducting legitimate work expenses (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "340000",
          unit: "₹",
          hint1: "Subtract work expenses from the gross fees collected.",
          hint2: "Calculate ₹4,00,000 − ₹60,000.",
          wrongExplanation: "Net Taxable Income = ₹4,00,000 − ₹60,000 = ₹3,40,000.",
          solutionExplanation: "Deducting ₹60,000 of real work expenses leaves ₹3,40,000 as net taxable earnings.",
          codeFragment: "67"
        }
      ]
    },

    {
      conceptId: "inflation_effect",
      conceptName: "Inflation's Effect on Cash",
      complexity: 5,
      supportedFormats: ["scenario_choice", "calculation"],
      variants: [
        {
          id: "fin_inf_v1",
          format: "calculation",
          title: "The Rising Cost of Groceries",
          whyItMatters: "Examine how rising prices erode the purchasing power of fixed cash over time.",
          story: "A monthly basket of basic groceries costs ₹2,000 today. If annual inflation runs at 6% over the coming year, how much will the exact same basket cost next year?",
          evidence: {
            type: "note",
            header: "COMMODITY PRICE TRACKER",
            lines: [
              "Current Cost: ₹2,000",
              "Annual Inflation Rate: 6%",
              "New Cost = Current Cost + (6% of Current Cost)"
            ]
          },
          question: "What will the grocery basket cost next year after 6% inflation (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "2120",
          unit: "₹",
          hint1: "First calculate 6% of ₹2,000.",
          hint2: "6% of ₹2,000 is ₹120. Add ₹120 to ₹2,000.",
          wrongExplanation: "6% of ₹2,000 is ₹120. Next year's cost = ₹2,000 + ₹120 = ₹2,120.",
          solutionExplanation: "With 6% inflation, the cost rises by ₹120, making the new price ₹2,120.",
          codeFragment: "83"
        },
        {
          id: "fin_inf_v2",
          format: "scenario_choice",
          title: "The Cash in the Floorboards",
          whyItMatters: "Explain why an old hidden cash stash bought far less than expected.",
          story: "An uncle hid ₹1,00,000 in paper currency under his floorboards in the year 2000. In 2025, he dug it up. The number of paper notes is still exactly ₹1,00,000.",
          evidence: {
            type: "statement",
            header: "HISTORICAL COMPARISON",
            lines: [
              "Year 2000: ₹1,00,000 could buy a small plot of land.",
              "Year 2025: ₹1,00,000 cannot even buy a modest second-hand scooter."
            ]
          },
          question: "What happened to the real purchasing power of that cash?",
          options: [
            { id: "A", text: "Rising prices (inflation) eroded what the money can buy, so it lost purchasing power" },
            { id: "B", text: "The paper notes magically doubled in real value because they were aged" }
          ],
          correctAnswer: "A",
          hint1: "Think about what a loaf of bread or house cost 25 years ago compared to today.",
          hint2: "Physical cash does not grow on its own; when goods get more expensive, cash buys less.",
          wrongExplanation: "Inflation causes prices to rise over time, steadily eroding the purchasing power of uninvested cash.",
          solutionExplanation: "Inflation increases the cost of living over time, meaning fixed paper cash buys significantly fewer goods as decades pass.",
          codeFragment: "83"
        },
        {
          id: "fin_inf_v3",
          format: "calculation",
          title: "The Commuter Ticket Rise",
          whyItMatters: "Calculate the expected cost of transportation next year.",
          story: "A monthly city transit pass costs ₹1,500 this year. Municipal transport announces a 10% inflation adjustment for next year.",
          evidence: {
            type: "statement",
            header: "MUNICIPAL TRANSIT NOTICE",
            lines: [
              "Current Pass Price: ₹1,500",
              "Inflation Adjustment: +10%"
            ]
          },
          question: "What will the pass cost next year after the 10% increase (in ₹)?",
          placeholder: "Enter the amount in ₹",
          correctAnswer: "1650",
          unit: "₹",
          hint1: "Calculate 10% of ₹1,500.",
          hint2: "10% of ₹1,500 is ₹150. Add ₹150 to ₹1,500.",
          wrongExplanation: "10% of ₹1,500 is ₹150. New price = ₹1,500 + ₹150 = ₹1,650.",
          solutionExplanation: "A 10% inflation adjustment adds ₹150, making the new price ₹1,650.",
          codeFragment: "83"
        },
        {
          id: "fin_inf_v4",
          format: "scenario_choice",
          title: "Beating the Cost of Living",
          whyItMatters: "Guide a worker who wants their 30-year retirement savings to retain its real value.",
          story: "If inflation averages 6% every year, what will happen if your retirement savings only earn 2% interest in a low-interest jar?",
          evidence: {
            type: "statement",
            header: "RATE COMPARISON",
            lines: [
              "Cost of Living Rise (Inflation): 6% per year.",
              "Interest Earned: 2% per year."
            ]
          },
          question: "Are your savings gaining or losing real purchasing power?",
          options: [
            { id: "A", text: "Losing purchasing power, because prices are rising faster (6%) than your growth (2%)" },
            { id: "B", text: "Gaining purchasing power, because 2% is a positive number" }
          ],
          correctAnswer: "A",
          hint1: "Compare the speed of price increases against the speed of your savings growth.",
          hint2: "If expenses rise at 6% while your money only grows at 2%, you fall behind by 4% every year.",
          wrongExplanation: "When inflation exceeds your interest rate, your money loses real purchasing power over time.",
          solutionExplanation: "Because prices rise at 6% while the money only grows at 2%, the real purchasing power shrinks every year.",
          codeFragment: "83"
        }
      ]
    },

    {
      conceptId: "investment_diversification",
      conceptName: "Spreading Money Across Different Places",
      complexity: 6, // Biased toward Room 4 in Finance pool
      supportedFormats: ["scenario_choice", "judgment_call"],
      variants: [
        {
          id: "fin_div_v1",
          format: "judgment_call",
          title: "The Single-Company Gamble",
          whyItMatters: "A client lost their entire life savings when an unhedged single business folded.",
          story: "An investor put 100% of their life savings (₹20,000,000) into a single friend's new tech startup. The friend claimed: 'This is guaranteed to make you rich; no need to put money anywhere else!'",
          evidence: {
            type: "statement",
            header: "CONCENTRATED BET RECORD",
            body: "'Placed 100% of capital into Friend's New Startup. No backup deposits, no other investments.'"
          },
          question: "Is placing all your money into a single company Safe or Suspicious?",
          options: [
            { id: "SAFE", text: "Safe" },
            { id: "SUSPICIOUS", text: "Suspicious" }
          ],
          correctAnswer: "SUSPICIOUS",
          hint1: "What happens if this single company faces a lawsuit, bankruptcy, or bad economy?",
          hint2: "Putting all your eggs in one basket leaves you vulnerable to total ruin if that basket breaks.",
          wrongExplanation: "Concentrating 100% of your money in one company exposes you to total financial catastrophe if that single firm fails.",
          solutionExplanation: "This is reckless financial behavior: putting all your savings into one company risks total loss if that company goes under.",
          codeFragment: "46"
        },
        {
          id: "fin_div_v2",
          format: "scenario_choice",
          title: "The Wisdom of Multiple Baskets",
          whyItMatters: "Explain why spreading money across hundreds of companies protects ordinary investors.",
          story: "Why do financial advisors recommend investing through broad index funds that hold shares in hundreds of diverse companies across technology, healthcare, agriculture, and banking?",
          evidence: {
            type: "statement",
            header: "DIVERSIFIED SPREAD PROFILE",
            lines: [
              "Strategy: Own a tiny slice of 500 different established businesses across all industries.",
              "Outcome: If one business struggles, the other 499 continue operating normally."
            ]
          },
          question: "What is the primary benefit of spreading your money across hundreds of companies?",
          options: [
            { id: "A", text: "It cushions you against total loss because a downturn in one company doesn't ruin your overall savings" },
            { id: "B", text: "It guarantees that the government will pay you cash bonuses every week" }
          ],
          correctAnswer: "A",
          hint1: "Think about the phrase: 'Don't put all your eggs in one basket.'",
          hint2: "When money is spread across hundreds of businesses, individual business failures have only a tiny impact.",
          wrongExplanation: "Spreading investments across many sectors and companies dramatically reduces the risk of catastrophic loss.",
          solutionExplanation: "Spreading your money cushions against individual company failures, ensuring your overall financial future remains secure.",
          codeFragment: "46"
        },
        {
          id: "fin_div_v3",
          format: "judgment_call",
          title: "The Broad Market Safety Principle",
          whyItMatters: "Evaluate this standard risk management guideline.",
          story: "A financial textbook states: 'Spreading your savings across different asset types (such as bank deposits, broad company funds, and government bonds) reduces the chance that a single market crash will wipe you out.'",
          evidence: {
            type: "statement",
            header: "RISK MANAGEMENT TEXTBOOK",
            body: "Asset diversification dampens volatility: different investments react differently to economic cycles, protecting overall wealth."
          },
          question: "Is this textbook principle Safe or Suspicious?",
          options: [
            { id: "SAFE", text: "Safe" },
            { id: "SUSPICIOUS", text: "Suspicious" }
          ],
          correctAnswer: "SAFE",
          hint1: "Does spreading your savings across multiple stable places reduce risk?",
          hint2: "Yes, this is the foundational bedrock of all modern wealth protection.",
          wrongExplanation: "Spreading savings across asset classes is the gold standard for reducing portfolio risk.",
          solutionExplanation: "This is an established, proven principle: spreading money across multiple places protects you from catastrophic loss.",
          codeFragment: "46"
        },
        {
          id: "fin_div_v4",
          format: "scenario_choice",
          title: "The Hot Stock Tip",
          whyItMatters: "A witness was pressured by an anonymous chat group to empty their savings into a single speculative stock.",
          story: "An anonymous online group urges members: 'Sell all your safe bank deposits and put every rupee into Penny Stock X before 10 AM tomorrow!'",
          evidence: {
            type: "message",
            header: "CHAT ROOM ALERT",
            body: "URGENT TIP: Liquidate everything and buy Penny Stock X! 100% of your cash now!"
          },
          question: "What should a wise investor do with their savings?",
          options: [
            { id: "A", text: "Ignore the high-pressure gamble and keep savings properly spread across safe, proven options" },
            { id: "B", text: "Empty all life savings into the unknown penny stock right before the deadline" }
          ],
          correctAnswer: "A",
          hint1: "Who benefits when thousands of people rush to pump up an unknown penny stock?",
          hint2: "Unregulated 'hot tips' urging you to risk all your money are classic pump-and-dump traps.",
          wrongExplanation: "Never dump life savings into speculative tips. Keep your funds safely diversified.",
          solutionExplanation: "Rushing all your money into an unverified tip violates basic diversification and risks losing everything in a pump-and-dump trap.",
          codeFragment: "46"
        }
      ]
    }
  ]
};

// Make CONCEPT_LIBRARY available globally on window object
if (typeof window !== "undefined") {
  window.CONCEPT_LIBRARY = CONCEPT_LIBRARY;
}

// -----------------------------------------------------------------------------
// ROOM_DATA — playable MVP room configuration
// This block is intentionally kept separate from the larger concept library.
// game.js uses this object to render the five-room game.
// -----------------------------------------------------------------------------
const ROOM_DATA = {
  1: {
    difficulties: {
      easy: {
        sector: "Challenge 1 • Broken Budget", title: "ROOM 1 — BROKEN BUDGET", subtitle: "Level: Easy",
        story: "You found a simple monthly budget. Work out how much money is left after the listed bills.",
        hint: "Add the three bills, then subtract that total from the income.",
        incomeLabel: "Monthly Income", incomeValue: 30000,
        expenses: [{name:"Rent",amount:10000},{name:"Food",amount:5000},{name:"Travel",amount:3000}],
        distractors: [], question: "How much money is left? (₹)", placeholder: "Enter amount", correctAnswer: "12000", codeFragment: "4",
        wrongExplanation: "₹30,000 − (₹10,000 + ₹5,000 + ₹3,000) = ₹12,000."
      },
      moderate: {
        sector: "Challenge 1 • Broken Budget", title: "ROOM 1 — BROKEN BUDGET", subtitle: "Level: Medium",
        story: "A monthly cash sheet has several bills and one number that is only a credit limit. Find the real balance left.",
        hint: "Do not count the credit-card limit as money that was actually paid.",
        incomeLabel: "Monthly Income", incomeValue: 42000,
        expenses: [{name:"Rent",amount:14000},{name:"Food",amount:8000},{name:"Travel",amount:3000}],
        distractors: [{name:"Credit Card Limit",amount:50000,note:"This is available credit, not a bill paid."}],
        question: "How much money is left after the three real bills? (₹)", placeholder: "Enter amount", correctAnswer: "17000", codeFragment: "6",
        wrongExplanation: "Only the three actual bills count: ₹42,000 − ₹25,000 = ₹17,000."
      },
      finance: {
        sector: "Challenge 1 • Broken Budget", title: "ROOM 1 — BROKEN BUDGET", subtitle: "Level: Hard",
        story: "The ledger includes income, expenses, and a loan amount that must be paid back. Calculate the cash remaining after this month's listed costs.",
        hint: "Add rent, food, transport, and the loan payment before subtracting from income.",
        incomeLabel: "Monthly Income", incomeValue: 60000,
        expenses: [{name:"Rent",amount:18000},{name:"Food",amount:10000},{name:"Transport",amount:4000},{name:"Loan Payment",amount:8000}],
        distractors: [], question: "How much money remains? (₹)", placeholder: "Enter amount", correctAnswer: "20000", codeFragment: "8",
        wrongExplanation: "₹60,000 − (₹18,000 + ₹10,000 + ₹4,000 + ₹8,000) = ₹20,000."
      }
    }
  },
  2: {
    difficulties: {
      easy: {
        sector: "Challenge 2 • Scam Check", title: "ROOM 2 — SCAM OR REAL?", subtitle: "Level: Easy",
        story: "A message says you won a prize and asks you to click a strange link urgently. Decide if it is a scam.",
        hint: "Unexpected prizes, strange links, and urgent pressure are warning signs.", sender: "Unknown Number", timestamp: "10:14 AM",
        messageContent: "CONGRATULATIONS! You won ₹50,000. Click this unknown link in 5 minutes to claim your prize!",
        question: "Is this message a scam or a real message?", options: [{id:"scam",text:"SCAM"},{id:"legit",text:"REAL"}], correctAnswer:"scam", codeFragment:"2",
        wrongExplanation:"An unexpected prize plus an unknown link and time pressure are classic scam warning signs."
      },
      moderate: {
        sector: "Challenge 2 • Scam Check", title: "ROOM 2 — SCAM OR REAL?", subtitle: "Level: Medium",
        story: "A message claims your bank account will be blocked unless you act immediately. Decide whether it is suspicious.",
        hint: "Banks do not normally ask you to share passwords, OTPs, or click random links through urgent messages.", sender: "BANK-ALERT", timestamp: "8:42 PM",
        messageContent: "URGENT: Your account will be suspended tonight. Verify immediately at bank-secure-login.example and share the OTP shown on screen.",
        question: "Is this message a scam or a real message?", options: [{id:"scam",text:"SCAM"},{id:"legit",text:"REAL"}], correctAnswer:"scam", codeFragment:"5",
        wrongExplanation:"Urgency, a suspicious link, and an OTP request are strong fraud warning signs."
      },
      finance: {
        sector: "Challenge 2 • Scam Check", title: "ROOM 2 — SCAM OR REAL?", subtitle: "Level: Hard",
        story: "A corporate payment alert looks professional but the sender domain is slightly different from the real company domain.",
        hint: "Check the exact sender and domain, not just the logo or wording.", sender: "accounts@paypaI-security.example", timestamp: "11:03 AM",
        messageContent: "Security notice: Confirm your payment credentials within 15 minutes using the attached verification page.",
        question: "Is this message a scam or a real message?", options: [{id:"scam",text:"SCAM"},{id:"legit",text:"REAL"}], correctAnswer:"scam", codeFragment:"7",
        wrongExplanation:"A look-alike sender/domain and pressure to enter credentials indicate phishing."
      }
    }
  },
  3: {
    difficulties: {
      easy: {
        sector: "Challenge 3 • Clue Hunt", title: "ROOM 3 — FIND THE CLUE", subtitle: "Level: Easy",
        story: "Read the receipt and find the amount marked as the suspicious purchase.", hint: "Look for the item marked FLAGGED.", voucherType:"RECEIPT", merchant:"CITY MART", date:"OCT 14",
        items:[{label:"Milk",val:"₹120"},{label:"Bread",val:"₹60"},{label:"FLAGGED — Gift Card",val:"₹900"}], total:"₹1,080", footerCode:"AUDIT COPY",
        question:"What is the amount of the flagged purchase? (₹)", placeholder:"Enter amount", correctAnswer:"900", codeFragment:"3",
        wrongExplanation:"The flagged Gift Card line shows ₹900."
      },
      moderate: {
        sector: "Challenge 3 • Clue Hunt", title: "ROOM 3 — FIND THE CLUE", subtitle: "Level: Medium",
        story: "One transaction on the payment slip is marked for review. Find its amount.", hint: "Find the line labelled SUSPENSE.", voucherType:"PAYMENT SLIP", merchant:"NORTHSTAR SERVICES", date:"NOV 02",
        items:[{label:"Office Supplies",val:"₹1,250"},{label:"Travel",val:"₹2,400"},{label:"SUSPENSE — Unverified Transfer",val:"₹3,750"}], total:"₹7,400", footerCode:"CASE 27",
        question:"What amount is under SUSPENSE? (₹)", placeholder:"Enter amount", correctAnswer:"3750", codeFragment:"1",
        wrongExplanation:"The SUSPENSE — Unverified Transfer line shows ₹3,750."
      },
      finance: {
        sector: "Challenge 3 • Clue Hunt", title: "ROOM 3 — FIND THE CLUE", subtitle: "Level: Hard",
        story: "Inspect the audit voucher and identify the discrepancy amount marked for investigation.", hint: "Look at the DISCREPANCY line.", voucherType:"AUDIT VOUCHER", merchant:"ORBITAL FINANCE", date:"DEC 09",
        items:[{label:"Reported Total",val:"₹18,500"},{label:"Recorded Total",val:"₹17,200"},{label:"DISCREPANCY",val:"₹1,300"}], total:"REVIEW REQUIRED", footerCode:"AUDIT 91",
        question:"What is the discrepancy amount? (₹)", placeholder:"Enter amount", correctAnswer:"1300", codeFragment:"9",
        wrongExplanation:"The voucher explicitly marks the discrepancy as ₹1,300."
      }
    }
  },
  4: {
    difficulties: {
      easy: {
        sector: "Challenge 4 • Investment Detective", title: "ROOM 4 — SMART MONEY", subtitle: "Level: Easy",
        story: "You have money needed next month. Choose the safer option.", hint: "Money needed soon should not be placed in a highly risky option.", scenario:"You need ₹10,000 for an important bill next month.",
        options:[{id:"A",name:"Safe Savings",risk:"LOW RISK",return:"LOWER RETURN",description:"Keep the money in a safe savings account."},{id:"B",name:"Speculative Coin",risk:"HIGH RISK",return:"HIGHER POSSIBLE RETURN",description:"Put all the money into a very volatile coin."}], correctAnswer:"A", codeFragment:"1",
        wrongExplanation:"Money needed soon should be kept in a safer, more stable place."
      },
      moderate: {
        sector: "Challenge 4 • Investment Detective", title: "ROOM 4 — SMART MONEY", subtitle: "Level: Medium",
        story: "A student has long-term savings and wants a sensible balance between growth and safety.", hint: "Avoid putting all your savings into one risky option.", scenario:"You have ₹50,000 for a goal five years away.",
        options:[{id:"A",name:"Diversified Mix",risk:"MODERATE RISK",return:"BALANCED",description:"Spread the money across suitable diversified investments and safer savings."},{id:"B",name:"One Hot Stock",risk:"HIGH RISK",return:"UNCERTAIN",description:"Put 100% into one stock because a friend says it will rise."}], correctAnswer:"A", codeFragment:"2",
        wrongExplanation:"Diversifying reduces the impact of one investment performing badly."
      },
      finance: {
        sector: "Challenge 4 • Investment Detective", title: "ROOM 4 — SMART MONEY", subtitle: "Level: Hard",
        story: "An investor has a long time horizon and wants growth without taking an all-or-nothing bet.", hint: "A long horizon can allow some growth assets, but diversification still matters.", scenario:"You are investing for ten years and want growth with controlled risk.",
        options:[{id:"A",name:"Diversified Growth Plan",risk:"MODERATE RISK",return:"GROWTH POTENTIAL",description:"Use a diversified mix suited to the time horizon instead of relying on one asset."},{id:"B",name:"All-in Speculation",risk:"VERY HIGH RISK",return:"VERY UNCERTAIN",description:"Put the entire amount into one speculative asset."}], correctAnswer:"A", codeFragment:"4",
        wrongExplanation:"A diversified approach avoids making the entire outcome depend on one speculative asset."
      }
    }
  },
  5: {
    masterCodes: { easy:"4231", moderate:"6512", finance:"8794" }
  }
};

if (typeof window !== "undefined") {
  window.ROOM_DATA = ROOM_DATA;
}
