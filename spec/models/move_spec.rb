require 'spec_helper'

describe Move do

  before do
    @move = Move.new(row: 0, column: 1, game_id: 1)
  end

  subject { @move }

  it { should respond_to(:row) }
  it { should respond_to(:column) }
  it { should respond_to(:game) }

  it { should be_valid }

  context "when row is not present" do
    before { @move.row = " " }
    it { should_not be_valid }
  end

  context "when column is not present" do
    before { @move.column = " " }
    it { should_not be_valid }
  end
  
  context "when game_id is not present" do
    before { @move.game_id = " " }
    it { should_not be_valid }
  end
end
