require 'spec_helper'

describe Game do
  
  before do
    @game = Game.new(
      number_of_rows: 10,
      number_of_columns: 10
    )
  end

  subject { @game }
  
  it { should respond_to(:number_of_rows) }
  it { should respond_to(:number_of_columns) }

  it { should be_valid }

  describe "when number of rows is not present" do
    before { @game.number_of_rows = " " }
    it { should_not be_valid }
  end

  describe "when number of columns is not present" do
    before { @game.number_of_columns = " " }
    it { should_not be_valid }
  end
end
