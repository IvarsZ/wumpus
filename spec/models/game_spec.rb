require 'spec_helper'

describe Game do
  
  before do
    @game = Game.new(
      number_of_rows: 8,
      number_of_columns: 12,
      number_of_pits: 6,
      number_of_bats: 4,
      number_of_arrows: 2
    )
  end

  subject { @game }
  
  it { should respond_to(:number_of_rows) }
  it { should respond_to(:number_of_columns) }
  it { should respond_to(:number_of_pits) }
  it { should respond_to(:number_of_bats) }
  it { should respond_to(:number_of_arrows) }

  it { should be_valid }

  describe "when number of rows is not present" do
    before { @game.number_of_rows = " " }
    it { should_not be_valid }
  end

  describe "when number of columns is not present" do
    before { @game.number_of_columns = " " }
    it { should_not be_valid }
  end
  
  describe "when number of pits is not present" do
    before { @game.number_of_pits = " " }
    it { should_not be_valid }
  end
  
  describe "when number of bats is not present" do
    before { @game.number_of_bats = " " }
    it { should_not be_valid }
  end

  describe "when number of arrows is not present" do
    before { @game.number_of_arrows = " " }
    it { should_not be_valid }
  end

   describe "cave generation" do
    before { @game.generate_cave }

    it "should have player" do
      @game.cave.count("C").should be(1)
    end

    it "should have door" do
      @game.cave.count("D").should be(1)
    end

    it "should have treasure" do
      @game.cave.count("T").should be(1)
    end

    it "should have wumpus" do
      @game.cave.count("W").should be(1)
    end

    it "should have correct number of pits" do
      @game.cave.count("P").should be(@game.number_of_pits)
    end

    it "should have correct number of bats" do
      @game.cave.count("B").should be(@game.number_of_bats)
    end
  end
end
