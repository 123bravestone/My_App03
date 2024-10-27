import Expenses from "../models/expense_Module.js";

// newUser create (POST) /api/user/create-user
export const createUser = async (req, res) => {
  const user = req.body;
  try {
    const newUser = await Expenses.create({
      username: user.username,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// add month Amount (POST) /api/user/add_monthAmount
export const addMonthAmount = async (req, res) => {
  const { mthAmount, id } = req.body;
  try {
    const newMonthAmount = await Expenses.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          mthAmount: mthAmount,
        },
      },
      {
        new: true,
      }
    );
    res.status(201).json(newMonthAmount.mthAmount);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// add expense of user (POST) /api/user/add_expense

export const addUserExpense = async (req, res) => {
  const expense = req.body;
  try {
    const existYear = await Expenses.findOne({
      _id: expense.id,
      userExpenses: { $elemMatch: { monthYear: expense.monthYear } },
    });

    if (existYear) {
      const addExpense = await Expenses.findOneAndUpdate(
        {
          _id: expense.id,
          "userExpenses.monthYear": expense.monthYear,
        },
        {
          $push: {
            "userExpenses.$.spends": expense.spends,
          },
        },
        {
          new: true,
        }
      );

      res
        .status(201)
        .json(addExpense.userExpenses[0].spends, addExpense[0].monthYear);
    } else {
      const newExpense = await Expenses.findOneAndUpdate(
        {
          _id: expense.id,
        },
        {
          $push: {
            userExpenses: {
              monthYear: expense.monthYear,
              spends: expense.spends,
            },
          },
        },
        {
          new: true,
        }
      );

      res.status(201).json(false);
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// expense delete (DELETE) /api/user/delete_expense

const deleteExpense = async (req, res) => {
  const request = req.params.id;
  try {
    await Expenses.findOneAndUpdate(
      {
        _id: request.id,
        userExpenses: {
          monthYear: request.monthYear,
        },
      },
      {
        $pull: {
          "userExpenses.$.spends": {
            _id: request.spendsId,
          },
        },
      },
      {
        new: true,
      }
    );
    res.status(201).json(true);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
