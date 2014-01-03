require 'spec_helper'

describe Game do

  RSpec::Matchers define :have_nearby do |content|
    match do |content|
      @game.notifications["nearby_#{content}"] == true
    end
  end
  
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
  it { should respond_to(:cave) }

  it { should be_valid }

  context "when number of rows is not present" do
    before { @game.number_of_rows = " " }
    it { should_not be_valid }
  end

  context "when number of columns is not present" do
    before { @game.number_of_columns = " " }
    it { should_not be_valid }
  end
  
  context "when number of pits is not present" do
    before { @game.number_of_pits = " " }
    it { should_not be_valid }
  end
  
  context "when number of bats is not present" do
    before { @game.number_of_bats = " " }
    it { should_not be_valid }
  end

  context "when number of arrows is not present" do
    before { @game.number_of_arrows = " " }
    it { should_not be_valid }
  end

  describe "cave" do
    
    before { @game.save }

    it "is generated" do
      @game.cave.should_not be_blank
    end

    it "has player" do
      @game.player_row.should be
      @game.player_column.should be
    end

    it "has door" do
      @game.cave.count(Game::CONTENTS[:door]).should be 1
    end

    it "has treasure" do
      @game.cave.count(Game::CONTENTS[:treasure]).should be 1
    end

    it "has wumpus" do
      @game.cave.count(Game::CONTENTS[:wumpus]).should be 1
    end

    it "has correct number of pits" do
      @game.cave.count(Game::CONTENTS[:pit]).should be @game.number_of_pits
    end

    it "has correct number of bats" do
      @game.cave.count(Game::CONTENTS[:bat]).should be @game.number_of_bats
    end
  end

  describe "status"

    before do
    
      @game = Game.new(
        number_of_rows: 6,
        number_of_columns: 6,
        number_of_pits: 3,
        number_of_bats: 1,
        number_of_arrows: 1
      )
      @game.stub(:generate_cave) do
        @game.cave = "......" \
                     ".W..P." \
                     "......" \
                     ".T..D." \
                     "......" \
                     ".B...."
      end
      @game.save
    end

    context "nothing around" do

      before do
        @game.player_row = 2
        @game.player_column = 2
      end

      it { should_not have_nearby :wumpus }
      it { should_not have_nearby :pit }
      it { should_not have_nearby :treasure }
    end

    context "nearby only wumpus" do

      before do
        @game.player_row = 1
        @game.player_column = 2
      end

      it { should have_nearby :wumpus }
      it { should_not have_nearby :pit }
      it { should_not have_nearby :treasure }
    end
  end
end
