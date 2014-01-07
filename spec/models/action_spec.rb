require 'spec_helper'

describe Action do

  before do
    @action = Action.new(row: 0, column: 1, game_id: 1)
  end

  subject { @action }

  it { should respond_to(:row) }
  it { should respond_to(:column) }
  it { should respond_to(:game) }

  it { should be_valid }

  context "when row is not present" do
    before { @action.row = " " }
    it { should_not be_valid }
  end

  context "when column is not present" do
    before { @action.column = " " }
    it { should_not be_valid }
  end
  
  context "when game_id is not present" do
    before { @action.game_id = " " }
    it { should_not be_valid }
  end
end
